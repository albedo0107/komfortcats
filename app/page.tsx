'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVideoRevealed, setIsVideoRevealed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Spustit animaci odhalení videa po načtení stránky
    const timer = setTimeout(() => {
      setIsVideoRevealed(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Přechod začíná hned od začátku (0vh - 1vh), pak druhá sekce zůstává (1vh - 2vh)
      if (scrollTop < windowHeight) {
        const progress = scrollTop / windowHeight;
        setScrollProgress(progress);
      } else {
        // Po 1vh je progress = 1 a druhá sekce zůstává vidět dalších 100vh
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-sm">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-12">
        <Image
                src="/komfortcars_logo.png"
                alt="Komfort Cars Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
          priority
              />
              <div className="hidden lg:flex gap-8">
                <a href="#" className="text-sm font-medium text-white hover:text-gray-300 transition">O nás</a>
                <a href="#" className="text-sm font-medium text-white hover:text-gray-300 transition">Jak to u nás probíhá?</a>
                <a href="#" className="text-sm font-medium text-white hover:text-gray-300 transition">Proč zvolit nás?</a>
                <a href="#" className="text-sm font-medium text-white hover:text-gray-300 transition">Dovezená vozidla</a>
                <a href="#" className="text-sm font-medium text-white hover:text-gray-300 transition">Kontakty</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden lg:block px-6 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200 transition">
                Chci dovést vozidlo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer pro scroll efekt - první 100vh slide up, další 100vh druhá sekce zůstává */}
      <div className="h-[200vh]"></div>

      {/* Hero Section - Hlavní video/foto - Fixed */}
      <section 
        className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-black"
        style={{ 
          zIndex: 20,
          pointerEvents: scrollProgress >= 1 ? 'none' : 'auto'
        }}
      >
        {/* Efekt odhalení - černý overlay který zmizí */}
        <div 
          className={`absolute inset-0 bg-black z-30 transition-opacity duration-[2000ms] ${
            isVideoRevealed ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        <div className="absolute inset-0 bg-black/50 z-10" />
        {/* Hero video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video_finall.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-6">
          <h2 className="text-5xl lg:text-7xl font-normal tracking-wider text-center mb-6 drop-shadow-[0_6px_12px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
            Dovážíme vozidla vašich snů
          </h2>
          <p className="text-xl lg:text-2xl font-light tracking-wide mb-4 text-center max-w-3xl drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
            Spolehlivost, kvalita a individuální přístup k vašim potřebám
          </p>
          <p className="text-lg lg:text-xl font-light tracking-wide mb-12 text-center max-w-2xl drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
            Zkušenosti od roku 1999 • Přes 3000 spokojených zákazníků
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition">
              Dovezená vozidla
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium hover:bg-white/10 transition">
              Chci dovést vozidlo
            </button>
          </div>
        </div>
      </section>

      {/* Video Section - Elektrická mobilita - Fixed, vyjíždí zdola */}
      <section 
        className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-black transition-transform duration-200 ease-out"
        style={{ 
          transform: `translateY(${(1 - scrollProgress) * 100}%)`,
          zIndex: 30
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-10" />
        {/* Video elektro */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/elektro.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h3 className="text-4xl lg:text-6xl font-light mb-6 drop-shadow-[0_6px_12px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
              Budoucnost začíná dnes
            </h3>
            <p className="text-xl lg:text-2xl font-light drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
              Nově dovážíme i elektrická vozidla šetrná k životnímu prostředí
            </p>
          </div>
        </div>
      </section>

      {/* Spacer po crossfade efektu */}
      <div className="h-screen"></div>

      {/* O nás & Jak to probíhá Section */}
      <section className="py-16 lg:py-20 bg-white relative z-50">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* O nás */}
            <div className="p-10 bg-white relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/background-sharp-blue.jpg"
                  alt="Background"
                  fill
                  className="object-cover brightness-140"
                  unoptimized
                />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-light mb-8" style={{ color: '#cfb270' }}>
                  O nás
                </h2>
                <div className="space-y-4 text-white leading-relaxed drop-shadow-lg">
                <p>
                  Firma KomfortCars je na českém trhu s ojetými vozy již od roku 1999.
                </p>
                <p>
                  Máme dlouholeté zkušenosti s výběrem a nákupem vozů v zahraničí. Věnujeme se především dovozu vozů z Německa, které mají kompletní servisní historii a garanci původu.
                </p>
                <p>
                  Za dobu působení jsme dovezli více než 3000 vozidel. Doporučení od našich klientů jsou důkazem spolehlivé a kvalitní práce.
                </p>
                <p>
                  Vaše spokojenost je pro nás prioritou.
                </p>
                
                {/* Mapa Německa */}
                <div className="mt-10 flex justify-center">
                  <div className="relative w-full max-w-xl">
                    <Image
                      src="/nemecko-transparent.png"
                      alt="Německo"
                      width={900}
                      height={900}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* Jak to u nás probíhá */}
            <div className="p-10" style={{ backgroundColor: '#353434' }}>
              <h3 className="text-3xl lg:text-4xl font-light text-white mb-10">
                Jak to u nás probíhá?
              </h3>
              
              <div className="space-y-8">
                {/* Krok 1 */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl font-light" style={{ color: '#cfb270' }}>01</span>
                    <h4 className="text-lg font-medium" style={{ color: '#cfb270' }}>Specifikace vozidla</h4>
                  </div>
                  <p className="text-gray-300">
                    První konzultace proběhne u nás, nebo v případě větší vzdálenosti telefonicky.
                  </p>
                </div>

                {/* Krok 2 */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl font-light" style={{ color: '#cfb270' }}>02</span>
                    <h4 className="text-lg font-medium" style={{ color: '#cfb270' }}>Hledání a výběr vozidla</h4>
                  </div>
                  <p className="text-gray-300">
                    Posíláme konkrétní nabídky vozidel k osobní kontrole ještě před odjezdem do Německa.
                  </p>
                </div>

                {/* Krok 3 */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl font-light" style={{ color: '#cfb270' }}>03</span>
                    <h4 className="text-lg font-medium" style={{ color: '#cfb270' }}>Odjezd do Německa</h4>
                  </div>
                  <p className="text-gray-300">
                    Posíláme odkazy a ceny vozidel, následuje telefonát s možností účasti klienta při výběru.
                  </p>
                </div>

                {/* Krok 4 */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl font-light" style={{ color: '#cfb270' }}>04</span>
                    <h4 className="text-lg font-medium" style={{ color: '#cfb270' }}>Prohlídka a nákup vozidla</h4>
                  </div>
                  <p className="text-gray-300">
                    Kompletní prohlídka a zkušební jízda s technikem, doporučení nebo pokračování v hledání.
                  </p>
                </div>

                {/* Krok 5 */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl font-light" style={{ color: '#cfb270' }}>05</span>
                    <h4 className="text-lg font-medium" style={{ color: '#cfb270' }}>Předání vozidla</h4>
                  </div>
                  <p className="text-gray-300">
                    Servisujeme, připravujeme a vyřizujeme vše potřebné - STK, emise, SPZ po dovozu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proč zvolit nás Section */}
      <section className="bg-white relative z-50">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Levá strana - šedý box roztažený na celou polovinu */}
            <div className="p-16 min-h-[600px] flex flex-col justify-center" style={{ backgroundColor: '#353434' }}>
              <h3 className="text-4xl lg:text-5xl font-light text-white mb-16">
                Proč zvolit nás?
              </h3>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                {/* Zkušenosti */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <h4 className="text-xl font-medium mb-3" style={{ color: '#cfb270' }}>Zkušenosti</h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Dlouholeté znalosti německého trhu.
                  </p>
                </div>

                {/* Původ automobilu */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <h4 className="text-xl font-medium mb-3" style={{ color: '#cfb270' }}>Původ automobilu</h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Prověřujeme kilometry, historii a původ.
                  </p>
                </div>

                {/* Naše standardy */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <h4 className="text-xl font-medium mb-3" style={{ color: '#cfb270' }}>Naše standardy</h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Nevyhovující vozidla nekupujeme.
                  </p>
                </div>

                {/* 100% Důvěra */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <h4 className="text-xl font-medium mb-3" style={{ color: '#cfb270' }}>100% Důvěra</h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Dovážíme jen ověřená vozidla.
                  </p>
                </div>

                {/* Váš komfort */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <h4 className="text-xl font-medium mb-3" style={{ color: '#cfb270' }}>Váš komfort</h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Zajišťujeme kompletní servis včetně SPZ.
                  </p>
                </div>

                {/* Doplňkové služby */}
                <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                  <h4 className="text-xl font-medium mb-3" style={{ color: '#cfb270' }}>Doplňkové služby</h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Pojištění, likvidace škod a pravidelný servis.
                  </p>
                </div>
              </div>
            </div>

            {/* Pravá strana - obrázek */}
            <div className="relative min-h-[600px]">
              <Image
                src="/background.jpg"
                alt="Komfort Cars"
                fill
                className="object-cover brightness-140"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Aktuálně předaná vozidla Section */}
      <section className="py-12 lg:py-16 bg-white relative z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8">
            Aktuálně předaná vozidla našim zákazníkům
          </h2>
          
          {/* Galerie vozidel */}
          <div className="grid grid-cols-4 gap-3">
            {/* Vozidlo 1 */}
            <a href="#" className="group cursor-pointer">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/staria.jpg"
                  alt="Hyundai Staria"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <p className="text-center text-xs mt-2 text-gray-700 group-hover:text-black transition">Hyundai Staria</p>
            </a>

            {/* Vozidlo 2 */}
            <a href="#" className="group cursor-pointer">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/kodiaq1-1.jpg"
                  alt="Škoda Kodiaq"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <p className="text-center text-xs mt-2 text-gray-700 group-hover:text-black transition">Škoda Kodiaq</p>
            </a>

            {/* Vozidlo 3 */}
            <a href="#" className="group cursor-pointer">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/bmw1.png"
                  alt="BMW"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <p className="text-center text-xs mt-2 text-gray-700 group-hover:text-black transition">BMW</p>
            </a>

            {/* Vozidlo 4 */}
            <a href="#" className="group cursor-pointer">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/2-18.png"
                  alt="Volkswagen Arteon"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <p className="text-center text-xs mt-2 text-gray-700 group-hover:text-black transition">Volkswagen Arteon</p>
            </a>
          </div>
        </div>
      </section>

      {/* Kontakt a Formulář Section */}
      <section className="py-16 lg:py-20 relative z-50 overflow-hidden" style={{ backgroundColor: '#c1ac68' }}>
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10 mix-blend-multiply">
          <Image
            src="/komfortcars_background.png.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Levá strana - Kontakt */}
            <div className="text-gray-900">
              <h2 className="text-3xl lg:text-4xl font-light mb-8">Kontakt</h2>
              
              <div className="space-y-6 text-sm">
                {/* Provozovna */}
                <div>
                  <p className="font-medium mb-1">Provozovna:</p>
                  <p>KOMFORTCARS</p>
                  <p>Ostravská 494, Sviadnov 739 25</p>
        </div>

                {/* Fakturační údaje */}
            <div>
                  <p className="font-medium mb-1">Fakturační údaje:</p>
                  <p>Josef Bystřičan</p>
                  <p>Chlebovice 269, Frýdek-Místek 739 42</p>
            </div>

                {/* IČO a DIČ */}
            <div>
                  <p>IČO: 69236356</p>
                  <p>DIČ: CZ7908094942</p>
            </div>

                {/* Kontaktní údaje */}
            <div>
                  <p>+420 608 808 285</p>
                  <p>info@komfortcars.cz</p>
                </div>
              </div>
            </div>

            {/* Pravá strana - Formulář */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6">
                Mám zájem o dovoz auta
              </h2>
              
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Jméno a příjmení"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition"
                />
                
                <input
                  type="tel"
                  placeholder="Telefon"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition"
                />
                
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition"
                />
                
                <input
                  type="text"
                  placeholder="Typ automobilu"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition"
                />
                
                <textarea
                  placeholder="Informace o požadovaném autu"
                  rows={4}
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition resize-none"
                />
                
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 accent-black"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-900">
                    Souhlasím se všeobecnými obchodními podmínkami
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition"
                >
                  Odeslat
                </button>
              </form>
            </div>
          </div>
          
          {/* Náš tým */}
          <div className="mt-20 pt-16 border-t border-gray-900/20">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-12">
              Náš tým
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              {/* Člen týmu 1 */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/Josef_Bystrican.png"
                    alt="Josef Bystřičan"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Josef Bystřičan</h3>
                <p className="text-sm text-gray-700">+420 608 808 285</p>
              </div>

              {/* Člen týmu 2 */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/Josef_Bystrican_ml.png"
                    alt="Josef Bystřičan ml."
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Josef Bystřičan ml.</h3>
                <p className="text-sm text-gray-700">+420 608 200 021</p>
              </div>

              {/* Člen týmu 3 */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src="/Sarka_Bystricanova.png"
                    alt="Mgr. Šárka Bystřičanová"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Mgr. Šárka Bystřičanová</h3>
                <p className="text-sm text-gray-700">+420 774 353 529</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Recenze (bude doplněno) */}
      <footer className="bg-black text-white py-20 lg:py-32 relative z-50">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <h2 className="text-4xl lg:text-5xl font-light text-white">
            Recenze
          </h2>
          {/* Zde budou recenze */}
        </div>
      </footer>
    </div>
  );
}
