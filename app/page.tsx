"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#434242] shadow-lg backdrop-blur' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Image
                src="/komfortcars_logo.png"
                alt="KomfortCars"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#o-nas" className="text-gray-300 hover:text-[#c1ac68] font-medium transition-colors">
                O nás
              </Link>
              <Link href="#jak-to-probiha" className="text-gray-300 hover:text-[#c1ac68] font-medium transition-colors">
                Jak to probíhá?
              </Link>
              <Link href="#proc-nas" className="text-gray-300 hover:text-[#c1ac68] font-medium transition-colors">
                Proč zvolit nás?
              </Link>
              <Link href="#vozidla" className="text-gray-300 hover:text-[#c1ac68] font-medium transition-colors">
                Dovezená vozidla
              </Link>
              <Link href="#kontakt" className="text-gray-300 hover:text-[#c1ac68] font-medium transition-colors">
                Kontakty
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* O nás Section */}
      <section id="o-nas" className="pt-32 pb-20 relative overflow-visible">
        <div className="absolute top-0 left-0 z-0 pointer-events-none">
          <img
            src="/background_final.jpg"
            alt="Pozadí KomfortCars"
            className="block"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-32 items-center min-h-[500px]">
            {/* Levý sloupec - Text */}
            <div className="lg:pl-24 xl:pl-32 relative">
              <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight">
                <span className="bg-gradient-to-r from-[#c1ac68] to-[#a8955a] bg-clip-text text-transparent">
                  O nás
                </span>
              </h2>
              <div className="space-y-8">
                <p className="text-xl text-white leading-relaxed font-light">
                  Firma KomfortCars je na českém trhu s ojetými vozy již od roku 1999. 
                  Při výběru a nákupu vozidel využíváme zkušeností, které jsme nabyli 
                  za dobu své bohaté praxe. Prioritou je spokojenost našich zákazníků, 
                  pro které jsme do dnešní doby dovezli přes 3000 vozidel.
                </p>
                <p className="text-xl text-white leading-relaxed font-light">
                  Následná doporučení dalším klientům jsou známkou toho, 
                  že svou práci děláme spolehlivě a kvalitně.
                </p>
              </div>
            </div>
            </div>

            {/* Pravý sloupec - Minimal řádky vpravo se separátory */}
            <div className="flex items-center lg:absolute lg:top-1/2 lg:left-[80%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[420px]">
              <div className="w-full">
                <div className="rounded-2xl bg-black/15 backdrop-blur shadow-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <tbody>
                      <tr>
                        <td className="px-5 py-3 text-xs uppercase tracking-wide text-white">Let zkušeností</td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#c1ac68] to-[#a8955a]">25+</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-xs uppercase tracking-wide text-white">Spokojených zákazníků</td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#c1ac68] to-[#a8955a]">3000+</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 text-xs uppercase tracking-wide text-white">Důvěra</td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#c1ac68] to-[#a8955a]">100%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="px-5 pb-4 pt-2 text-[11px] text-gray-100">Na trhu od roku 1999 • Osobní prověření vozidel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jak to probíhá Section */}
      <section id="jak-to-probiha" className="py-20 relative overflow-hidden bg-[#f1f1f1]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-[#c1ac68] to-[#a8955a] bg-clip-text text-transparent">
                Jak to u nás probíhá?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">Profesionální proces dovozu vozidel krok za krokem</p>
          </div>
          
          <div className="relative">
            {/* Spojovací čára pro desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c1ac68]/30 via-[#c1ac68] to-[#c1ac68]/30 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-5 gap-8 relative z-10">
              <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 hover:border-[#c1ac68]/80 hover:shadow-[#c1ac68]/20 transition-all duration-200 hover:scale-105 group relative">
                <div className="bg-gradient-to-br from-[#c1ac68] to-[#9d8a4f] text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-125 group-hover:shadow-[#c1ac68]/50 transition-all duration-200 relative z-10">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Specifikace vozidla</h3>
                <p className="text-gray-600 leading-relaxed">Preferujeme osobní setkání, kde si vysvětlíme postup při dovozu vozidla.</p>
              </div>
              
              <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 hover:border-[#c1ac68]/80 hover:shadow-[#c1ac68]/20 transition-all duration-200 hover:scale-105 group relative">
                <div className="bg-gradient-to-br from-[#c1ac68] to-[#9d8a4f] text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-125 group-hover:shadow-[#c1ac68]/50 transition-all duration-200 relative z-10">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Hledání vozidla</h3>
                <p className="text-gray-600 leading-relaxed">Pošleme konkrétní nabídky vozidel, která pojedeme osobně prověřit.</p>
              </div>
              
              <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 hover:border-[#c1ac68]/80 hover:shadow-[#c1ac68]/20 transition-all duration-200 hover:scale-105 group relative">
                <div className="bg-gradient-to-br from-[#c1ac68] to-[#9d8a4f] text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-125 group-hover:shadow-[#c1ac68]/50 transition-all duration-200 relative z-10">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Odjezd do Německa</h3>
                <p className="text-gray-600 leading-relaxed">Posíláme aktuální odkazy na vozidla, která splňují požadavky.</p>
              </div>
              
              <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 hover:border-[#c1ac68]/80 hover:shadow-[#c1ac68]/20 transition-all duration-200 hover:scale-105 group relative">
                <div className="bg-gradient-to-br from-[#c1ac68] to-[#9d8a4f] text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-125 group-hover:shadow-[#c1ac68]/50 transition-all duration-200 relative z-10">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Prohlídka a nákup</h3>
                <p className="text-gray-600 leading-relaxed">Po kompletní prohlídce a zkušební jízdě vozidlo doporučíme nebo hledáme další.</p>
              </div>
              
              <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 hover:border-[#c1ac68]/80 hover:shadow-[#c1ac68]/20 transition-all duration-200 hover:scale-105 group relative">
                <div className="bg-gradient-to-br from-[#c1ac68] to-[#9d8a4f] text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-125 group-hover:shadow-[#c1ac68]/50 transition-all duration-200 relative z-10">
                  5
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Předání vozidla</h3>
                <p className="text-gray-600 leading-relaxed">Servisujeme a připravujeme k předání včetně veškeré administrativy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vozidla Section */}
      <section id="vozidla" className="py-20 relative bg-[#434242]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-[#c1ac68] to-[#a8955a] bg-clip-text text-transparent">
                Aktuálně předaná vozidla
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">Naši zákazníci si převzali tato luxusní vozidla</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/vozidla/subaru-forester" className="block bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:border-[#c1ac68]/80 hover:shadow-[#c1ac68]/20 transition-all duration-200 hover:scale-105 group">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/1-24.png"
                  alt="Subaru Forester"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#c1ac68] transition-colors">Subaru Forester</h3>
                <p className="text-gray-600 mb-4">2.0 i / 2017 / 26 000 km / 110kW</p>
                <div className="inline-flex items-center text-[#c1ac68] group-hover:text-[#c1ac68] font-bold group-hover:translate-x-2 transition-all duration-300">
                  Zobrazit vozidlo →
                </div>
              </div>
            </Link>
            
            <Link href="/vozidla/hyundai-staria" className="block bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:border-[#c1ac68]/80 hover:shadow-[#c1ac68]/20 transition-all duration-200 hover:scale-105 group">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/1-17.png"
                  alt="Hyundai Staria"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#c1ac68] transition-colors">Hyundai Staria</h3>
                <p className="text-gray-600 mb-4">31. 3. 2025</p>
                <div className="inline-flex items-center text-[#c1ac68] group-hover:text-[#c1ac68] font-bold group-hover:translate-x-2 transition-all duration-300">
                  Zobrazit vozidlo →
                </div>
              </div>
            </Link>
            
            <Link href="/vozidla/vw-arteon" className="block bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:border-[#c1ac68]/80 hover:shadow-[#c1ac68]/20 transition-all duration-200 hover:scale-105 group">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/arteon2.jpg"
                  alt="Volkswagen Arteon R-line"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#c1ac68] transition-colors">Volkswagen Arteon R-line</h3>
                <p className="text-gray-600 mb-4">18. 2. 2025</p>
                <div className="inline-flex items-center text-[#c1ac68] group-hover:text-[#c1ac68] font-bold group-hover:translate-x-2 transition-all duration-300">
                  Zobrazit vozidlo →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Proč zvolit nás Section */}
      <section id="proc-nas" className="py-20 relative overflow-hidden bg-[#f1f1f1]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-[#c1ac68] to-[#a8955a] bg-clip-text text-transparent">
                Proč zvolit nás?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">Naše výhody pro luxusní dovoz vozidel</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-8 hover:bg-gray-100 transition-all duration-300 rounded-lg">
              <div className="mx-auto mb-6 flex items-center justify-center">
                <Image src="/ikona-klic.svg" alt="Ikona klíč" width={48} height={48} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Zkušenosti</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Dlouholeté znalosti německého automobilového trhu</p>
            </div>
            
            <div className="text-center p-8 hover:bg-gray-100 transition-all duration-300 rounded-lg">
              <div className="mx-auto mb-6 flex items-center justify-center">
                <Image src="/ikona-certifikat.svg" alt="Ikona certifikát" width={48} height={48} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Důvěra</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Dovážíme jen vozidla splňující požadované parametry</p>
            </div>
            
            <div className="text-center p-8 hover:bg-gray-100 transition-all duration-300 rounded-lg">
              <div className="mx-auto mb-6 flex items-center justify-center">
                <Image src="/ikona-rychlomer.svg" alt="Ikona rychloměr" width={48} height={48} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Původ automobilu</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Prověřujeme stav kilometrů a historii vozidla</p>
            </div>
            
            <div className="text-center p-8 hover:bg-gray-100 transition-all duration-300 rounded-lg">
              <div className="mx-auto mb-6 flex items-center justify-center">
                <Image src="/ikona-osoba-palec.svg" alt="Ikona osoba palec" width={48} height={48} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Váš komfort</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Kompletní služby - transport, STK, servis, SPZ</p>
            </div>
            
            <div className="text-center p-8 hover:bg-gray-100 transition-all duration-300 rounded-lg">
              <div className="mx-auto mb-6 flex items-center justify-center">
                <Image src="/ikona-auto.svg" alt="Ikona auto" width={48} height={48} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Naše standardy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Kupujeme jen vozidla splňující naše standardy</p>
            </div>
            
            <div className="text-center p-8 hover:bg-gray-100 transition-all duration-300 rounded-lg">
              <div className="mx-auto mb-6 flex items-center justify-center">
                <Image src="/ikona-zakaznik.svg" alt="Ikona zákazník" width={48} height={48} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Doplňkové služby</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Pojištění, likvidace škod, servis, odtah</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="pt-8 pb-20 relative bg-[#0f0f0f]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-[#c1ac68] to-[#a8955a] bg-clip-text text-transparent">
                Kontakt
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">Spojte se s našimi odborníky na luxusní dovoz vozidel</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="pl-4">
              <h3 className="text-2xl font-bold mb-8 text-white">Náš tým</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-[#c1ac68] pl-4 bg-white p-4 rounded-2xl shadow-2xl border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Image
                      src="/Josef_Bystrican.png"
                      alt="Josef Bystřičan"
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <h4 className="text-lg font-bold text-gray-900">Josef Bystřičan</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Tel.: +420 608 808 285</p>
                  <p className="text-gray-600 text-sm">E-mail: info@komfortcars.cz</p>
                </div>
                <div className="border-l-4 border-[#c1ac68] pl-4 bg-white p-4 rounded-2xl shadow-2xl border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Image
                      src="/Josef_Bystrican_ml.png"
                      alt="Josef Bystřičan ml."
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <h4 className="text-lg font-bold text-gray-900">Josef Bystřičan ml.</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Tel.: +420 608 200 021</p>
                </div>
                <div className="border-l-4 border-[#c1ac68] pl-4 bg-white p-4 rounded-2xl shadow-2xl border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Image
                      src="/Sarka_Bystricanova.png"
                      alt="Mgr. Šárka Bystřičanová"
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <h4 className="text-lg font-bold text-gray-900">Mgr. Šárka Bystřičanová</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Tel.: +420 774 353 529</p>
                </div>
              </div>
              
              <div className="mt-8 bg-white p-4 rounded-2xl shadow-2xl border border-gray-200">
                <h4 className="text-lg font-bold mb-3 text-gray-900">Provozovna</h4>
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm font-semibold">KOMFORTCARS</p>
                  <p className="text-gray-600 text-sm">Ostravská 494</p>
                  <p className="text-gray-600 text-sm">Sviadnov 739 25</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-8 text-white">Mám zájem o dovoz auta</h3>
              <form className="flex-1 space-y-6 bg-white p-4 rounded-2xl shadow-2xl border border-gray-200">
                <div>
                  <label htmlFor="jmeno" className="block text-sm font-bold text-gray-900 mb-2">
                    Jméno a příjmení *
                  </label>
                  <input
                    type="text"
                    id="jmeno"
                    name="jmeno"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1ac68] focus:border-[#c1ac68] bg-white text-gray-900 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="telefon" className="block text-sm font-bold text-gray-900 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1ac68] focus:border-[#c1ac68] bg-white text-gray-900 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1ac68] focus:border-[#c1ac68] bg-white text-gray-900 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="typ-auta" className="block text-sm font-bold text-gray-900 mb-2">
                    Typ automobilu *
                  </label>
                  <textarea
                    id="typ-auta"
                    name="typ-auta"
                    rows={3}
                    required
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1ac68] focus:border-[#c1ac68] bg-white text-gray-900 transition-all duration-300"
                    placeholder="Popište požadavky na vozidlo..."
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="souhlas"
                    name="souhlas"
                    required
                    className="h-4 w-4 text-[#c1ac68] focus:ring-[#c1ac68] border-gray-300 rounded bg-white"
                  />
                  <label htmlFor="souhlas" className="ml-2 block text-sm text-gray-600">
                    Souhlasím se všeobecnými obchodními podmínkami *
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#c1ac68] to-[#a8955a] text-black py-2 px-4 rounded-lg font-bold text-sm hover:from-[#c1ac68] hover:to-[#a8955a] transition-all duration-300 shadow-2xl hover:shadow-[#c1ac68]/25 transform hover:scale-105"
                  >
                    Odeslat
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-600 py-12 bg-[#f1f1f1]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src="/komfortcars_logo.png"
              alt="KomfortCars"
              width={200}
              height={60}
              className="h-12 w-auto mx-auto mb-6"
            />
            <p className="text-gray-600 mb-4">
              © 2024 Dovoz aut z Německa | KomfortCars
            </p>
            <p className="text-gray-600">
              🌟 Na trhu od 1999 | Více než 3000 spokojených zákazníků
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

