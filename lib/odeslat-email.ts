/**
 * Odeslání e-mailu z formuláře přes Resend (náhrada n8n, 11/2026).
 *
 * Proměnné prostředí (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   klíč Resendu (stačí „Sending access“)
 *   FORMULAR_OD      odesílatel, např. "KomfortCars.cz <formulare@albedoai.cz>"
 *                    (doména musí být v Resendu ověřená)
 *   FORMULAR_KOMU    volitelně přepíše příjemce (čárkou oddělené adresy)
 *
 * Test: když zpráva obsahuje text „TEST ALBEDO“, předmět dostane na začátek
 * „[TEST] “, aby příjemce hned viděl, že jde o zkoušku formuláře.
 *
 * Když odeslání selže, funkce vyhodí chybu. Route pak vrátí 502 a formulář
 * ukáže zákazníkovi chybu (n8n dřív vracelo „OK“, i když e-mail neodešel).
 */

const RESEND_URL = "https://api.resend.com/emails";

export type Email = {
  komu: string[];
  predmet: string;
  html: string;
  odpovedetNa?: string;
};

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Čas odeslání ve formátu ISO s časovou zónou Prahy (jako n8n {{ $now.toISO() }}). */
export function casIso(datum = new Date()): string {
  const casti = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Prague",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hourCycle: "h23", timeZoneName: "longOffset",
    })
      .formatToParts(datum)
      .map((p) => [p.type, p.value]),
  );
  const ms = String(datum.getMilliseconds()).padStart(3, "0");
  const posun = (casti.timeZoneName as string).replace("GMT", "") || "+00:00";
  return `${casti.year}-${casti.month}-${casti.day}T${casti.hour}:${casti.minute}:${casti.second}.${ms}${posun}`;
}

export function platnyEmail(value: string): boolean {
  return /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(value);
}

export async function odeslatEmail(email: Email): Promise<string> {
  const klic = process.env.RESEND_API_KEY;
  const od = process.env.FORMULAR_OD;
  if (!klic || !od) throw new Error("Chybí RESEND_API_KEY nebo FORMULAR_OD.");

  const komu = process.env.FORMULAR_KOMU
    ? process.env.FORMULAR_KOMU.split(",").map((a) => a.trim()).filter(Boolean)
    : email.komu;

  const telo = JSON.stringify({
    from: od,
    to: komu,
    subject: /TEST ALBEDO/i.test(email.html) ? `[TEST] ${email.predmet}` : email.predmet,
    html: email.html,
    ...(email.odpovedetNa && platnyEmail(email.odpovedetNa) ? { reply_to: email.odpovedetNa } : {}),
  });

  let posledniChyba = "";
  for (let pokus = 1; pokus <= 3; pokus++) {
    try {
      const odpoved = await fetch(RESEND_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${klic}`, "Content-Type": "application/json" },
        body: telo,
        signal: AbortSignal.timeout(10000),
      });
      const text = await odpoved.text();
      if (odpoved.ok) return (JSON.parse(text) as { id?: string }).id ?? "";
      posledniChyba = `Resend ${odpoved.status}: ${text.slice(0, 300)}`;
      // 4xx kromě 429 se opakováním nespraví (špatný klíč, neověřená doména)
      if (odpoved.status < 500 && odpoved.status !== 429) break;
    } catch (chyba) {
      posledniChyba = chyba instanceof Error ? chyba.message : String(chyba);
    }
    await new Promise((r) => setTimeout(r, 700 * pokus));
  }
  throw new Error(posledniChyba);
}

/**
 * Kontrola zdraví pro Uptime Kumu (GET na route formuláře). Nic neodesílá.
 * Ověří, že jsou nastavené proměnné a že Resend klíč přijímá (klíč „jen
 * odesílání“ dostane na seznam domén 401 restricted_api_key = klíč platí).
 * Odpověď obsahuje "status":"ok", jinak HTTP 503 a důvod.
 */
export async function zdraviFormulare(): Promise<Response> {
  const hlavicky = { "Cache-Control": "no-store" };
  const chyba = (duvod: string) =>
    Response.json({ status: "chyba", duvod }, { status: 503, headers: hlavicky });

  const klic = process.env.RESEND_API_KEY;
  if (!klic) return chyba("Chybí RESEND_API_KEY.");
  if (!process.env.FORMULAR_OD) return chyba("Chybí FORMULAR_OD.");
  try {
    const r = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${klic}` },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const j = (await r.json().catch(() => ({}))) as { name?: string; message?: string };
    if (r.ok || j.name === "restricted_api_key") {
      return Response.json({ status: "ok" }, { headers: hlavicky });
    }
    return chyba(`Resend odmítl klíč: ${j.message ?? r.status}`);
  } catch (e) {
    return chyba(`Resend nedostupný: ${e instanceof Error ? e.message : String(e)}`);
  }
}

/** Podpis kopie zprávy pro portál: HMAC-SHA256 z "<cas>.<tělo>" klíčem RESEND_API_KEY (portál má stejný klíč). */
export async function podpis(cas: string, telo: string, klic: string): Promise<string> {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(klic), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const s = await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(`${cas}.${telo}`));
  return Array.from(new Uint8Array(s), (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Kopie zprávy z formuláře do portálu ALBEDO (albedoai.cz/apps), aby šlo vidět,
 * co přišlo, i když e-mail neodešel. Selhání kopie nikdy neshodí formulář.
 */
export async function zaznamenat(z: {
  web: string;
  predmet: string;
  pole: [string, string][];
  stav: "odeslano" | "chyba";
  chyba?: string;
}): Promise<void> {
  const klic = process.env.RESEND_API_KEY;
  if (!klic) return;
  const url = process.env.FORMULAR_ZAZNAM_URL ?? "https://albedoai.cz/api/formulare/zaznam";
  try {
    const telo = JSON.stringify(z);
    const cas = String(Date.now());
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-cas": cas, "x-podpis": await podpis(cas, telo, klic) },
      body: telo,
      signal: AbortSignal.timeout(5000),
    });
  } catch (e) {
    console.error("[formular] kopie do portálu neodešla:", e);
  }
}
