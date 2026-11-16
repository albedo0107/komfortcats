import { NextResponse } from "next/server";
import { casIso, escapeHtml as e, odeslatEmail, zdraviFormulare } from "@/lib/odeslat-email";

/**
 * Poptávka z formuláře (hlavní stránka a O nás) → e-mail Pepimu.
 * Nahrazuje n8n workflow „Formulář_komfortcars“; e-mail má stejný předmět,
 * příjemce i vzhled jako dřív.
 */

const PRIJEMCE = ["pepa.bystrican@seznam.cz"];
const MAX_LEN = 5000;

function pole(body: Record<string, unknown>, klic: string): string {
  const v = body[klic];
  return typeof v === "string" ? v.trim().slice(0, MAX_LEN) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }

  const d = {
    jmeno: pole(body, "jmeno"),
    telefon: pole(body, "telefon"),
    email: pole(body, "email"),
    typ_auta: pole(body, "typ_auta"),
    informace: pole(body, "informace"),
    zdroj: pole(body, "zdroj"),
  };
  if (!d.jmeno && !d.telefon && !d.email) {
    return NextResponse.json({ error: "Prázdný formulář." }, { status: 400 });
  }

  const html = `<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <h2 style="color: #cfb270;">🚗 Nová poptávka z KomfortCars.cz</h2>
  
  <table style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
    <tr style="background-color: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 150px;">Jméno a příjmení:</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${e(d.jmeno)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Telefon:</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${e(d.telefon)}</td>
    </tr>
    <tr style="background-color: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">E-mail:</td>
      <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${e(d.email)}">${e(d.email)}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Typ automobilu:</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${e(d.typ_auta)}</td>
    </tr>
    <tr style="background-color: #f5f5f5;">
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Informace:</td>
      <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${e(d.informace)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Zdroj:</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${e(d.zdroj)}</td>
    </tr>
  </table>

  <p style="margin-top: 20px; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 15px;">
    <strong>Odesláno:</strong> ${casIso()}
  </p>
</div>`;

  try {
    await odeslatEmail({ komu: PRIJEMCE, predmet: "Nová poptávka - KomfortCars", html, odpovedetNa: d.email });
  } catch (chyba) {
    // Celá poptávka do logu Vercelu, aby šla dohledat i při výpadku e-mailu.
    console.error("[formular] e-mail neodešel:", chyba, JSON.stringify(d));
    return NextResponse.json({ error: "Odeslání selhalo." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

/** Kontrola pro Uptime Kumu: nic neodesílá, jen ověří nastavení a klíč Resendu. */
export async function GET() {
  return zdraviFormulare();
}
