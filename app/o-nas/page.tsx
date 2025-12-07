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
              {/* Instagram odkaz */}
              <a 
                href="https://www.instagram.com/komfortcarscz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden lg:block text-white hover:text-gray-300 transition"
                aria-label="Instagram"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
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
            {/* Instagram odkaz v mobilním menu */}
            <a 
              href="https://www.instagram.com/komfortcarscz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white hover:text-gray-300 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
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
                  quality={50}
                  priority
                  sizes="100vw"
                />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 sm:mb-8" style={{ color: '#cfb270' }}>
                  O nás
                </h2>
                <div className="space-y-4 sm:space-y-5 text-white text-sm sm:text-base leading-relaxed drop-shadow-lg">
                  <p>
                    KomfortCars je rodinná firma s dlouholetou tradicí, která působí na českém trhu již od roku 1999. Při výběru a nákupu vozidel využíváme zkušenosti získané během více než dvacetileté praxe.
                  </p>
                  <p>
                    Naší prioritou je spokojenost zákazníků, pro které jsme za dobu našeho působení dovezli již přes 3000 vozidel. Specializujeme se na dovoz automobilů na objednávku z Německa a Švédska, kde pečlivě vybíráme vozy s jasnou historií a ve výborném technickém stavu.
                  </p>
                  <p>
                    Následná doporučení našich spokojených klientů jsou pro nás potvrzením, že svou práci děláme poctivě, kvalitně a s osobním přístupem.
                  </p>
                  
                  {/* Obrázek Europa */}
                  <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
                    <div className="relative w-full max-w-lg sm:max-w-2xl md:max-w-3xl aspect-video rounded-lg overflow-hidden border-2 bg-gray-800" style={{ borderColor: '#cfb270' }}>
                      <Image
                        src="/europa.jpg"
                        alt="Europa"
                        fill
                        className="object-cover"
                        quality={60}
                        sizes="(max-width: 640px) 100vw, 768px"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Logo KomfortCars */}
                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <div className="bg-black/80 rounded-lg p-3 border-2" style={{ borderColor: '#cfb270' }}>
                      <Image
                        src="/komfortcars_logo.png"
                        alt="KomfortCars"
                        width={120}
                        height={40}
                        className="h-8 sm:h-10 w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulář pro dovoz vozidla */}
            <div className="rounded-lg border-4 shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-center" style={{ borderColor: '#cfb270', backgroundColor: '#353434' }}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6" style={{ color: '#cfb270' }}>
                Mám zájem o dovoz auta
              </h2>
              
              <form className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  placeholder="Jméno a příjmení"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition text-sm sm:text-base rounded"
                  style={{ outline: 'none' }}
                />
                
                <input
                  type="tel"
                  placeholder="Telefon"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition text-sm sm:text-base rounded"
                />
                
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition text-sm sm:text-base rounded"
                />
                
                <input
                  type="text"
                  placeholder="Typ automobilu"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition text-sm sm:text-base rounded"
                />
                
                <textarea
                  placeholder="Informace o požadovaném autu"
                  rows={4}
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition resize-none text-sm sm:text-base rounded"
                />
                
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms-onas"
                    className="mt-1 w-4 h-4 flex-shrink-0"
                    style={{ accentColor: '#cfb270' }}
                  />
                  <label htmlFor="terms-onas" className="text-xs sm:text-sm text-white">
                    Souhlasím se všeobecnými obchodními podmínkami
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 font-medium hover:opacity-90 transition text-sm sm:text-base rounded"
                  style={{ backgroundColor: '#cfb270', color: '#000' }}
                >
                  Odeslat
                </button>
              </form>
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
              Na trhu od 1999 | Více než 3000 spokojených zákazníků
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
