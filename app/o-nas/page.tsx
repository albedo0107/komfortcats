"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ONasPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-sm">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-12">
              <Link href="/">
                <Image
                  src="/komfortcars_logo.png"
                  alt="Komfort Cars Logo"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
              <div className="hidden lg:flex gap-8">
                <Link href="/o-nas" className="text-sm font-medium text-white hover:text-gray-300 transition">O nás</Link>
                <Link href="/#jak-to-probiha" className="text-sm font-medium text-white hover:text-gray-300 transition">Jak to u nás probíhá?</Link>
                <Link href="/#vozidla" className="text-sm font-medium text-white hover:text-gray-300 transition">Dovezená vozidla</Link>
                <Link href="/#kontakt" className="text-sm font-medium text-white hover:text-gray-300 transition">Kontakty</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/#formular" className="hidden lg:block px-6 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200 transition">
                Chci dovést vozidlo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      {/* O nás Section */}
      <section className="py-16 lg:py-20 bg-black relative z-50">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* O nás s mapou - VRÁCENO NA PRVNÍ MÍSTO */}
            <div className="p-10 bg-[#f1f1f1] relative overflow-hidden">
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

            {/* Proč zvolit nás - VRÁCENO NA DRUHÉ MÍSTO */}
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
          </div>
        </div>
      </section>

      {/* Proč zvolit nás Section - druhá sekce */}
      <section className="bg-black relative z-50">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Levá strana - šedý box */}
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

      {/* Footer */}
      <footer className="text-gray-400 py-12 bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src="/komfortcars_logo.png"
              alt="KomfortCars"
              width={200}
              height={60}
              className="h-12 w-auto mx-auto mb-6"
            />
            <p className="text-gray-400 mb-4">
              © 2024 Dovoz aut z Německa | KomfortCars
            </p>
            <p className="text-gray-400">
              🌟 Na trhu od 1999 | Více než 3000 spokojených zákazníků
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

