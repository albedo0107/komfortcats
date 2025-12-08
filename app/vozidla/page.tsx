"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Data vozidel - stejná jako na hlavní stránce
const carsData = {
  audiA3: {
    name: "Audi A3",
    type: "1.4 TSI",
    images: ["/Audi%20A3/AudiA3_1.jpeg", "/Audi%20A3/AudiA3_2.jpeg", "/Audi%20A3/AudiA3_3.jpeg", "/Audi%20A3/AudiA3_4.jpeg"],
    specs: [
      "Rok výroby: 2016",
      "Motor: 1.4 TSI",
      "Výkon: 92 kW",
      "Km: 90 000 km",
      "Prověřený původ"
    ]
  },
  audi: {
    name: "Audi A4 Avant",
    type: "2.0 TDI",
    images: ["/Audi%20A4/audia4_1.jpeg", "/Audi%20A4/audia4_2.jpeg", "/Audi%20A4/audia4_3.jpeg", "/Audi%20A4/audia4_4.jpeg"],
    specs: [
      "Rok výroby: 2019",
      "Motor: 2.0 TDI",
      "Výkon: 110 kW",
      "Km: 152 000 km",
      "Prověřený původ"
    ]
  },
  audiA4Second: {
    name: "Audi A4 Avant",
    type: "2.0 TDI",
    images: ["/Audi_A4/Audi_1.jpg", "/Audi_A4/Audi_2.jpg", "/Audi_A4/Audi_3.jpg", "/Audi_A4/Audi_4.jpg"],
    specs: [
      "Rok výroby: 2019",
      "Motor: 2.0 TDI",
      "Výkon: 140 kW",
      "Km: 148 000 km",
      "Prověřený původ"
    ]
  },
  audiS6: {
    name: "Audi S6 Avant",
    type: "3.0",
    images: ["/Audi%20S6/AudiS6_1.jpeg", "/Audi%20S6/AudiS6_2.jpeg", "/Audi%20S6/AudiS6_3.jpeg", "/Audi%20S6/AudiS6_4.jpeg"],
    specs: [
      "Rok výroby: 2020",
      "Motor: 3.0",
      "Výkon: 257 kW",
      "Km: 113 000 km",
      "Prověřený původ"
    ]
  },
  bmw118: {
    name: "BMW 118i",
    type: "118i",
    images: ["/BMW%20118/118_1.jpeg", "/BMW%20118/118_2.jpeg", "/BMW%20118/118_3.jpeg", "/BMW%20118/118_4.jpeg"],
    specs: [
      "Rok výroby: 2023",
      "Motor: 118i",
      "Výkon: 100 kW",
      "Km: 20 500 km",
      "Prověřený původ"
    ]
  },
  bmw530e: {
    name: "BMW 530e",
    type: "X-Drive",
    images: ["/BMW%20530e/530_1.jpg", "/BMW%20530e/530_2.jpg", "/BMW%20530e/530_3.jpeg", "/BMW%20530e/530_4.jpeg"],
    specs: [
      "Rok výroby: 2022",
      "Motor: X-Drive",
      "Výkon: 135 kW",
      "Km: 102 000 km",
      "Prověřený původ"
    ]
  },
  bmwX3: {
    name: "BMW X3",
    type: "X-Drive20i",
    images: ["/BMWX3/BMWX3_1.jpeg", "/BMWX3/BMWX3_2.jpeg", "/BMWX3/BMWX3_3.jpeg", "/BMWX3/BMWX3_4.jpeg"],
    specs: [
      "Rok výroby: 2023",
      "Motor: X-Drive20i",
      "Výkon: 135 kW",
      "Km: 28 000 km",
      "Prověřený původ"
    ]
  },
  bmwX5: {
    name: "BMW X5",
    type: "3.0 X-Drive",
    images: ["/BMW%20X5/BMW_X5_1.jpeg", "/BMW%20X5/BMW_X5_2.jpeg", "/BMW%20X5/BMW_X5_3.jpeg", "/BMW%20X5/BMW_X5_4.jpeg"],
    specs: [
      "Rok výroby: 2017",
      "Motor: 3.0 X-Drive",
      "Výkon: 190 kW",
      "Km: 180 000 km",
      "Prověřený původ"
    ]
  },
  mazda6: {
    name: "Mazda 6",
    type: "2.5 SkyActiv",
    images: ["/Mazda_6/Mazda6_1.jpeg", "/Mazda_6/Mazda6_2.jpeg", "/Mazda_6/Mazda6_3.jpeg", "/Mazda_6/Mazda6_4.jpeg"],
    specs: [
      "Rok výroby: 2023",
      "Motor: 2.5 SkyActiv",
      "Výkon: 143 kW",
      "Km: 46 000 km",
      "Prověřený původ"
    ]
  },
  mazdaCX5: {
    name: "Mazda CX-5",
    type: "2.5 SkyActiv",
    images: ["/Mazda%20CX-5/CX-5_1.jpg", "/Mazda%20CX-5/CX-5_2.jpeg", "/Mazda%20CX-5/CX-5_3.jpeg", "/Mazda%20CX-5/CX-5_4.jpeg"],
    specs: [
      "Rok výroby: 2020",
      "Motor: 2.5 SkyActiv",
      "Výkon: 143 kW",
      "Km: 54 000 km",
      "Prověřený původ"
    ]
  },
  mazdaCX60: {
    name: "Mazda CX-60",
    type: "HOMURA 2.5 L. AWD",
    images: ["/Mazda_CX-60/MazdaCX-60_1.jpeg", "/Mazda_CX-60/MazdaCX-60_2.jpeg", "/Mazda_CX-60/MazdaCX-60_3.jpeg", "/Mazda_CX-60/MazdaCX-60_4.jpeg"],
    specs: [
      "Rok výroby: 2022",
      "Motor: HOMURA 2.5 L. AWD",
      "Výkon: 141 kW",
      "Km: 30 000 km",
      "Prověřený původ"
    ]
  },
  mbMarcoPolo: {
    name: "Mercedes Benz Marco Polo",
    type: "2.0",
    images: ["/MB_MarcoPolo/MB_1.jpeg", "/MB_MarcoPolo/MB_2.jpeg", "/MB_MarcoPolo/MB_3.jpeg", "/MB_MarcoPolo/MB_4.jpeg"],
    specs: [
      "Rok výroby: 2021",
      "Motor: 2.0",
      "Výkon: 140 kW",
      "Km: 74 500 km",
      "Prověřený původ"
    ]
  },
  fabie: {
    name: "Škoda Fabie 3",
    type: "1.2 TSI",
    images: ["/Fabie/Fabie1.jpeg", "/Fabie/Fabie2.jpeg", "/Fabie/Fabie3.jpeg", "/Fabie/Fabie4.jpeg"],
    specs: [
      "Rok výroby: 2015",
      "Motor: 1.2 TSI",
      "Výkon: 66 kW",
      "Km: 104 000 km",
      "Prověřený původ"
    ]
  },
  superb2: {
    name: "Škoda Superb 2",
    type: "2.0TDI",
    images: ["/Superb%202/SUP2_1.jpeg", "/Superb%202/SUP2_2.jpeg", "/Superb%202/SUP2_3.jpeg", "/Superb%202/SUP2_4.jpeg"],
    specs: [
      "Rok výroby: 2015",
      "Motor: 2.0TDI",
      "Výkon: 103 kW",
      "Km: 195 000 km",
      "Prověřený původ"
    ]
  },
  superb3: {
    name: "Škoda Superb 3",
    type: "2.0 TDI",
    images: ["/Superb3/SUP3_1.jpeg", "/Superb3/SUP3_2.jpeg", "/Superb3/SUP3_3.jpeg", "/Superb3/SUP3_4.jpeg"],
    specs: [
      "Rok výroby: 2016",
      "Motor: 2.0 TDI",
      "Výkon: 110 kW",
      "Km: 140 000 km",
      "Prověřený původ"
    ]
  },
  scrossHybrid: {
    name: "Suzuki S-Cross",
    type: "1.4 Hybrid",
    images: ["/Scross.1.4Hybrid/Scross_1.jpeg", "/Scross.1.4Hybrid/Scross_2.jpeg", "/Scross.1.4Hybrid/Scross_3.jpeg", "/Scross.1.4Hybrid/Scross_4.jpeg"],
    specs: [
      "Rok výroby: 2022",
      "Motor: 1.4 Hybrid",
      "Výkon: 95 kW",
      "Km: 23 000 km",
      "Prověřený původ"
    ]
  },
  suzukiScross: {
    name: "Suzuki S-Cross",
    type: "1.4 BoosterJet 4x4",
    images: ["/Suzuki%20Scross/Suzuki_Scross_1.jpeg", "/Suzuki%20Scross/Suzuki_Scross_2.jpeg", "/Suzuki%20Scross/Suzuki_Scross_3.jpeg", "/Suzuki%20Scross/Suzuki_Scross_4.jpeg"],
    specs: [
      "Rok výroby: 2019",
      "Motor: 1.4 BoosterJet 4x4",
      "Výkon: 103 kW",
      "Km: 39 000 km",
      "Prověřený původ"
    ]
  },
  suzukiVitara: {
    name: "Suzuki Vitara",
    type: "1.6 VVT",
    images: ["/Suzuki_Vitara_1.6/Suzuki_virara1.jpeg", "/Suzuki_Vitara_1.6/Suzuki_vitara2.jpeg", "/Suzuki_Vitara_1.6/Suzuki_vitara3.jpeg", "/Suzuki_Vitara_1.6/Suzuki_vitara4.jpeg"],
    specs: [
      "Rok výroby: 2017",
      "Motor: 1.6 VVT",
      "Výkon: 88 kW",
      "Km: 74 000 km",
      "Prověřený původ"
    ]
  },
  tiguanR: {
    name: "Volkswagen Tiguan R",
    type: "2.0 TSI",
    images: ["/Tiguan%20R/TiguanR_1.jpeg", "/Tiguan%20R/TiguanR_2.jpeg", "/Tiguan%20R/TiguanR_3.jpeg", "/Tiguan%20R/TiguanR_4.jpeg"],
    specs: [
      "Rok výroby: 2022",
      "Motor: 2.0 TSI",
      "Výkon: 235 kW",
      "Km: 39 000 km",
      "Prověřený původ"
    ]
  },
  touran: {
    name: "Volkswagen Touran",
    type: "1.4 TSI",
    images: ["/VW_Touran/Touran_1.jpeg", "/VW_Touran/Touran_2.jpeg", "/VW_Touran/Touran_3.jpeg", "/VW_Touran/Touran_4.jpeg"],
    specs: [
      "Rok výroby: 2017",
      "Motor: 1.4 TSI",
      "Výkon: 110 kW",
      "Km: 105 400 km",
      "Prověřený původ"
    ]
  }
};

export default function VozidlaPage() {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Zablokovat scrollování když je mobilní menu otevřené nebo modal
  useEffect(() => {
    if (isMobileMenuOpen || selectedCar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, selectedCar]);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-sm">
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
                className="lg:hidden text-white p-2"
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
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black border-t border-gray-800">
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
        )}
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20"></div>

      {/* Galerie vozidel */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-8 sm:mb-12 text-center">
            Všechna dovezená vozidla
          </h1>
          
          {/* Galerie vozidel - grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12">
            {Object.entries(carsData).map(([key, car], index) => (
              <div 
                key={key} 
                onClick={() => setSelectedCar(key)} 
                className="group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-4 shadow-lg hover:shadow-xl transition-shadow bg-gray-200">
                  <Image
                    src={car.images[0]}
                    alt={car.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading={index < 8 ? "eager" : "lazy"}
                    quality={60}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIDEQAEBSESMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/ANO4nkuQj0YoNaZ45QyiRvNgVJBs0APR/O8Rdjl97YnkkmZ5JGLMzGyST7JxJKpXJGxWf//Z"
                  />
                </div>
                <h3 className="text-center text-lg sm:text-xl font-medium text-gray-900 group-hover:text-[#cfb270] transition">
                  {car.name}
                </h3>
                <div className="mt-2 text-center">
                  <div className="inline-flex gap-1">
                    {car.specs.slice(0, 1).map((spec, idx) => (
                      <span key={idx} className="text-sm text-gray-600">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tlačítko pro kontakt */}
          <div className="text-center">
            <a 
              href="/#formular" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition text-base sm:text-lg"
            >
              Chci dovést podobné vozidlo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-12 relative z-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center">
            <Image
              src="/komfortcars_logo.png"
              alt="KomfortCars"
              width={200}
              height={60}
              className="h-10 sm:h-12 w-auto mx-auto mb-4 sm:mb-6"
            />
            <p className="text-gray-400 text-sm sm:text-base">
              © 2025 Dovoz aut z Německa | KomfortCars
            </p>
            <p className="text-gray-500 text-xs mt-4">
              Custom web design & automation by <a href="https://albedoai.cz" target="_blank" rel="noopener noreferrer" className="text-[#cfb270] hover:text-[#e0c885] transition">albedoAI.cz</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Modal pro detail vozidla */}
      {selectedCar && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-1 sm:p-3 lg:p-8 overflow-y-auto"
          onClick={() => setSelectedCar(null)}
        >
          <div 
            className="bg-[#353434] w-full max-w-5xl lg:max-w-2xl xl:max-w-3xl rounded-lg overflow-hidden relative my-1 sm:my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zavírací tlačítko */}
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-1 right-1 sm:top-4 sm:right-4 lg:top-3 lg:right-3 z-[110] w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 flex items-center justify-center bg-black/70 hover:bg-black/90 rounded-full text-white text-2xl sm:text-4xl lg:text-3xl font-light hover:text-[#cfb270] transition-all shadow-lg"
              aria-label="Zavřít"
            >
              ×
            </button>

            <div className="p-2 sm:p-6 lg:p-6">
              <div className="mb-3 sm:mb-8 lg:mb-4 pr-6 sm:pr-8">
                <h2 className="text-lg sm:text-3xl lg:text-2xl font-light text-white" style={{ color: '#cfb270' }}>
                  {carsData[selectedCar as keyof typeof carsData].name}
                </h2>
                {carsData[selectedCar as keyof typeof carsData].type && (
                  <p className="text-gray-300 text-sm sm:text-xl lg:text-base mt-1 sm:mt-2 lg:mt-1">
                    {carsData[selectedCar as keyof typeof carsData].type}
                  </p>
                )}
              </div>

              {/* Grid fotky */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 lg:gap-3 mb-3 sm:mb-8 lg:mb-4">
                {carsData[selectedCar as keyof typeof carsData].images.map((img, idx) => (
                  <div key={idx} className="aspect-video relative overflow-hidden rounded-lg bg-gray-700">
                    <Image
                      src={img}
                      alt={`${carsData[selectedCar as keyof typeof carsData].name} ${idx + 1}`}
                      fill
                      className="object-cover"
                      loading={idx < 2 ? "eager" : "lazy"}
                      quality={60}
                      sizes="(max-width: 640px) 50vw, 400px"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIDEQAEBSESMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/ANO4nkuQj0YoNaZ45QyiRvNgVJBs0APR/O8Rdjl97YnkkmZ5JGLMzGyST7JxJKpXJGxWf//Z"
                    />
                  </div>
                ))}
              </div>

              {/* Specifikace - jednoduchý formát */}
              <div className="border-l-2 pl-2 sm:pl-6 lg:pl-4 mb-3 sm:mb-8 lg:mb-4" style={{ borderColor: '#cfb270' }}>
                <h3 className="text-sm sm:text-xl lg:text-base font-medium mb-1 sm:mb-4 lg:mb-2" style={{ color: '#cfb270' }}>Specifikace</h3>
                <p className="text-white text-sm sm:text-2xl lg:text-lg font-light">
                  {(() => {
                    const car = carsData[selectedCar as keyof typeof carsData];
                    const rok = car.specs.find(s => s.startsWith('Rok výroby:'))?.replace('Rok výroby: ', '') || '';
                    const vykonRaw = car.specs.find(s => s.startsWith('Výkon:'))?.replace('Výkon: ', '') || '';
                    const vykon = vykonRaw.toLowerCase().replace(/\s/g, '');
                    const kmRaw = car.specs.find(s => s.startsWith('Km:'))?.replace('Km: ', '').replace(' km', 'km') || '';
                    const km = kmRaw;
                    return `${rok} / ${vykon} / ${km}`;
                  })()}
                </p>
              </div>

              {/* Tlačítko pro dovoz podobného vozidla */}
              <div className="text-center">
                <a 
                  href="/#formular" 
                  onClick={() => setSelectedCar(null)}
                  className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-8 lg:px-6 py-2 sm:py-4 lg:py-3 font-medium hover:bg-[#d4ba7f] transition text-xs sm:text-base lg:text-sm"
                  style={{ backgroundColor: '#cfb270', color: '#000' }}
                >
                  Chci dovést podobné vozidlo
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

