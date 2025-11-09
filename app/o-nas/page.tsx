"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ONasPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Zablokovat scrollování když je mobilní menu otevřené
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-12">
              <Link href="/">
                <Image
                  src="/komfortcars_logo.png"
                  alt="Komfort Cars Logo"
                  width={180}
                  height={60}
                  className="h-10 sm:h-12 w-auto"
                  priority
                />
              </Link>
              <div className="hidden lg:flex gap-8">
                <Link href="/o-nas" className="text-sm font-medium text-white hover:text-gray-300 transition">O nás</Link>
                <a href="/#jak-to-probiha" className="text-sm font-medium text-white hover:text-gray-300 transition">Jak to u nás probíhá?</a>
                <a href="/#vozidla" className="text-sm font-medium text-white hover:text-gray-300 transition">Dovezená vozidla</a>
                <a href="/#kontakt" className="text-sm font-medium text-white hover:text-gray-300 transition">Kontakty</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/#formular" className="hidden lg:block px-6 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200 transition">
                Chci dovést vozidlo
              </a>
              {/* Hamburger menu pro mobil */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-2 z-[110]"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobilní menu */}
        <div className={`lg:hidden bg-black border-t border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/o-nas" 
              className="block text-white hover:text-gray-300 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              O nás
            </Link>
            <a 
              href="/#jak-to-probiha" 
              className="block text-white hover:text-gray-300 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Jak to u nás probíhá?
            </a>
            <a 
              href="/#vozidla" 
              className="block text-white hover:text-gray-300 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dovezená vozidla
            </a>
            <a 
              href="/#kontakt" 
              className="block text-white hover:text-gray-300 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kontakty
            </a>
            <a 
              href="/#formular" 
              className="block w-full px-6 py-3 bg-white text-black text-center font-medium hover:bg-gray-200 transition mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chci dovést vozidlo
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20"></div>

      {/* O nás Section */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-black relative z-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
            {/* O nás s mapou */}
            <div className="p-6 sm:p-8 md:p-10 relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 -z-0">
                <Image
                  src="/background-sharp-blue.jpg"
                  alt="Background"
                  fill
                  className="object-cover brightness-140"
                  unoptimized
                />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 sm:mb-8" style={{ color: '#cfb270' }}>
                  O nás
                </h2>
                <div className="space-y-3 sm:space-y-4 text-white text-sm sm:text-base leading-relaxed drop-shadow-lg">
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
                  <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center">
                    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-xl">
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

            {/* Obrázek auta */}
            <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-lg border-4 shadow-2xl" style={{ borderColor: '#cfb270' }}>
              <Image
                src="/background.jpg"
                alt="Komfort Cars"
                fill
                className="object-cover"
                quality={100}
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-400 py-8 sm:py-12 bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src="/komfortcars_logo.png"
              alt="KomfortCars"
              width={200}
              height={60}
              className="h-10 sm:h-12 w-auto mx-auto mb-4 sm:mb-6"
            />
            <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
              © 2024 Dovoz aut z Německa | KomfortCars
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              🌟 Na trhu od 1999 | Více než 3000 spokojených zákazníků
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

