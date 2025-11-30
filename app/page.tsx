'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// Data vozidel
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

// Google recenze data - seřazené od nejnovějších
const reviewsData = [
  { name: "Anna Köttová", initial: "A", text: "Skvělá zkušenost s dovozem vozidla z Německa. Profesionální přístup, vše proběhlo hladce a rychle. Mohu jen doporučit!", date: "před 2 týdny", rating: 5 },
  { name: "Pavel Žižkovský", initial: "P", text: "Absolutní spokojenost. Vozidlo v perfektním stavu, kompletní servis a vyřízení všech formalit. Pan Bystřičan odvedl skvělou práci.", date: "před 1 měsícem", rating: 5 },
  { name: "Evka", initial: "E", text: "Doporučuji! Pán Bystřičan je velmi vstřícný a ochotný. Auto přesně podle představ. Děkuji za individuální přístup.", date: "před 2 měsíci", rating: 5 },
  { name: "Andrea Opluštilová", initial: "A", text: "Perfektní komunikace, rychlé vyřízení. Vozidlo odpovídá popisu, žádné skryté vady. Velmi profesionální jednání.", date: "před 3 měsíci", rating: 5 },
  { name: "Martin Novák", initial: "M", text: "Díky KomfortCars mám auto snů! Celý proces byl transparentní a profesionální. Opravdu kvalitní služby.", date: "před 4 měsíci", rating: 5 },
  { name: "Jana Svobodová", initial: "J", text: "Spolehlivá firma s dlouholetými zkušenostmi. Dovoz proběhl bez problémů. Vřele doporučuji všem.", date: "před 5 měsíci", rating: 5 },
  { name: "Tomáš Černý", initial: "T", text: "Vynikající servis od začátku do konce. Auto dorazilo přesně jak bylo domluveno. Děkuji!", date: "před 6 měsíci", rating: 5 },
  { name: "Petra Málková", initial: "P", text: "Nejlepší volba pro dovoz auta! Férové jednání, žádné skryté poplatky. Moc děkuji.", date: "před 7 měsíci", rating: 5 }
];

export default function Home() {
  const [isVideoRevealed, setIsVideoRevealed] = useState(true);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [googleReviews, setGoogleReviews] = useState<any[]>([]);
  const [googleRating, setGoogleRating] = useState<number>(4.9);
  const [totalReviews, setTotalReviews] = useState<number>(63);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detekce mobilního zařízení
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const prevReview = () => {
    const totalLength = googleReviews.length > 0 ? googleReviews.length : reviewsData.length;
    setCurrentReviewIndex((prev) => (prev - 1 + totalLength) % totalLength);
  };

  // Swipe handlers pro karusel
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && carouselIndex < Object.keys(carsData).length - 1) {
      setCarouselIndex(carouselIndex + 1);
    }
    if (isRightSwipe && carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    }
  };

  // Načíst Google recenze
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        
        if (data.reviews && data.reviews.length > 0) {
          setGoogleReviews(data.reviews);
          setGoogleRating(data.rating);
          setTotalReviews(data.totalReviews);
        }
      } catch (error) {
        console.log('Using fallback reviews');
        // Pokud API selže, použijeme manuální data
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-sm">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-12">
              <Image
                src="/komfortcars_logo.png"
                alt="Komfort Cars Logo"
                width={180}
                height={60}
                className="h-10 sm:h-12 w-auto"
          priority
              />
              <div className="hidden lg:flex gap-8">
                <Link href="/o-nas" className="text-sm font-medium text-white hover:text-gray-300 transition">O nás</Link>
                <a href="#jak-to-probiha" className="text-sm font-medium text-white hover:text-gray-300 transition">Jak to u nás probíhá?</a>
                <a href="#vozidla" className="text-sm font-medium text-white hover:text-gray-300 transition">Dovezená vozidla</a>
                <a href="#kontakt" className="text-sm font-medium text-white hover:text-gray-300 transition">Kontakty</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#formular" className="hidden lg:block px-6 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200 transition">
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
                href="#jak-to-probiha" 
                className="block text-white hover:text-gray-300 transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jak to u nás probíhá?
              </a>
              <a 
                href="#vozidla" 
                className="block text-white hover:text-gray-300 transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dovezená vozidla
              </a>
              <a 
                href="#kontakt" 
                className="block text-white hover:text-gray-300 transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kontakty
              </a>
              <a 
                href="#formular" 
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

      {/* Hero Section - Hlavní video */}
      <section className="relative md:sticky top-0 w-full h-screen overflow-hidden bg-black"
        style={{ zIndex: 20 }}
      >
        {/* Efekt odhalení - černý overlay který zmizí */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-[2000ms] ${
            isVideoRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ zIndex: 30 }}
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
        
        {/* Gradient na konci - pouze mobil */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none z-20"></div>
        
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center text-white px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-wider text-center mb-4 sm:mb-6 drop-shadow-[0_6px_12px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
            Dovážíme vozidla vašich snů
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide mb-3 sm:mb-4 text-center max-w-3xl px-4 drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
            Spolehlivost, kvalita a individuální přístup k vašim potřebám
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide mb-8 sm:mb-12 text-center max-w-2xl px-4 drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
            Zkušenosti od roku 1999 • Přes 3000 spokojených zákazníků
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md mx-auto px-4">
            <a href="#vozidla" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-medium hover:bg-gray-100 transition text-center text-sm sm:text-base whitespace-nowrap">
              Dovezená vozidla
            </a>
            <a href="#formular" className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-medium hover:bg-white/10 transition text-center text-sm sm:text-base whitespace-nowrap">
              Chci dovést vozidlo
            </a>
              </div>
            </div>
      </section>

      {/* Video Section - Elektrická mobilita */}
      <section className="sticky top-0 w-full h-screen overflow-hidden bg-black"
        style={{ zIndex: 30 }}
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
        
        {/* Gradient na začátku - pouze mobil */}
        <div className="md:hidden absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-30"></div>
        
        <div className="absolute inset-0 z-40 flex items-center justify-center px-4 sm:px-6">
          <div className="text-center text-white max-w-3xl">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 drop-shadow-[0_6px_12px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
              Budoucnost začíná dnes
            </h3>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light px-4 mb-8 sm:mb-10 drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
              Nově dovážíme i elektrická vozidla šetrná k životnímu prostředí
            </p>
            <a 
              href="#formular" 
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition text-center text-sm sm:text-base whitespace-nowrap inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Dovoz elektroauta
            </a>
                  </div>
                </div>
      </section>

      {/* Jak to probíhá Section */}
<section id="jak-to-probiha" className="relative z-50 overflow-hidden pt-8 sm:pt-12 pb-12 sm:pb-16" style={{ backgroundColor: '#353434' }}>
  {/* Nadpis */}
  <div className="relative z-20">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white text-center">
        Jak to u nás probíhá?
      </h3>
    </div>
  </div>

  {/* Hlavní kontejner */}
  <div className="hidden lg:block relative w-full max-w-[1920px] mx-auto px-6 -mt-20 lg:-mt-32">
    <div className="relative w-full" style={{ paddingBottom: '50%' }}>
      
      <div className="absolute inset-0">
        
        {/* SVG Wave na pozadí - čárkovaný střed, plné okraje */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 1920 864" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            {/* Horní plná vlnovka */}
            <path 
              d="M 0 302 
                 Q 200 302 300 350 
                 Q 400 398 422 449 
                 Q 444 500 550 480 
                 Q 656 460 800 380 
                 Q 900 330 960 302 
                 Q 1020 274 1120 330 
                 Q 1220 386 1300 449 
                 Q 1380 512 1500 480 
                 Q 1620 448 1750 350 
                 Q 1850 280 1920 302" 
              stroke="url(#gradient)" 
              strokeWidth="2" 
              fill="none"
              opacity="0.4"
              transform="translate(0, -40)"
            />
            
            {/* Hlavní ČÁRKOVANÁ vlnovka uprostřed */}
            <path 
              d="M 0 302 
                 Q 200 302 300 350 
                 Q 400 398 422 449 
                 Q 444 500 550 480 
                 Q 656 460 800 380 
                 Q 900 330 960 302 
                 Q 1020 274 1120 330 
                 Q 1220 386 1300 449 
                 Q 1380 512 1500 480 
                 Q 1620 448 1750 350 
                 Q 1850 280 1920 302" 
              stroke="url(#gradient)" 
              strokeWidth="3" 
              fill="none"
              opacity="0.8"
              strokeDasharray="15 15"
            />
            
            {/* Dolní plná vlnovka */}
            <path 
              d="M 0 302 
                 Q 200 302 300 350 
                 Q 400 398 422 449 
                 Q 444 500 550 480 
                 Q 656 460 800 380 
                 Q 900 330 960 302 
                 Q 1020 274 1120 330 
                 Q 1220 386 1300 449 
                 Q 1380 512 1500 480 
                 Q 1620 448 1750 350 
                 Q 1850 280 1920 302" 
              stroke="url(#gradient)" 
              strokeWidth="2" 
              fill="none"
              opacity="0.4"
              transform="translate(0, 40)"
            />
            
            {/* Gradient definice */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#cfb270', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#d4ba7f', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#cfb270', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Vnitřní kontejner */}
        <div className="absolute inset-0" style={{ fontSize: 'clamp(14px, 1.2vw, 20px)' }}>
          
          {/* KROK 1 - Start vlny (x=0-15%, y=35%) - NAD vlnou */}
          <div className="absolute" style={{ left: '2%', top: '23%' }}>
            {/* Obrázek nahoře */}
            <div className="relative mx-auto mb-3" style={{ width: '13em', height: '13em' }}>
              <Image
                src="/01.jpg"
                alt="Osobní setkání"
                fill
                className="rounded-lg shadow-xl object-cover"
              />
            </div>
            {/* Text pod obrázkem */}
            <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-xl" style={{ paddingLeft: '0.9em', paddingTop: '0.7em', paddingBottom: '0.7em', paddingRight: '0.9em' }}>
              <div className="flex items-center mb-1" style={{ gap: '0.6em' }}>
                <span className="text-[#cfb270] font-light" style={{ fontSize: '2em', lineHeight: '1' }}>01</span>
                <h4 className="font-semibold text-[#cfb270]" style={{ fontSize: '0.95em', lineHeight: '1.2' }}>
                  Osobní<br />setkání
                </h4>
              </div>
              <p className="text-white" style={{ fontSize: '0.75em', lineHeight: '1.5', maxWidth: '14em' }}>
                Preferujeme osobní setkání, kde si vysvětlíme, jak budeme při dovozu vozidla postupovat. V případě větší vzdálenosti konzultujeme telefonicky (dovážíme vozidla po celé ČR).
              </p>
                  </div>
                </div>

          {/* KROK 2 - První propad vlny (x=22%, y=52%) - POD vlnou */}
          <div className="absolute" style={{ left: '22%', top: '55%' }}>
            {/* Text nahoře */}
            <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-xl mb-3" style={{ paddingLeft: '1em', paddingTop: '0.8em', paddingBottom: '0.8em', paddingRight: '1em' }}>
              <div className="flex items-center mb-1" style={{ gap: '0.7em' }}>
                <span className="text-[#cfb270] font-light" style={{ fontSize: '2.2em', lineHeight: '1' }}>02</span>
                <h4 className="font-semibold text-[#cfb270]" style={{ fontSize: '1em', lineHeight: '1.2' }}>
                  Příprava<br />nabídky
                </h4>
              </div>
              <p className="text-white" style={{ fontSize: '0.8em', lineHeight: '1.5', maxWidth: '15em' }}>
                Před odjezdem do Německa Vám pošleme konkrétní nabídky vozidel, které pojedeme osobně prověřit.
              </p>
            </div>
            {/* Obrázek dole */}
            <div className="relative mx-auto" style={{ width: '14em', height: '14em' }}>
              <Image
                src="/02.jpg"
                alt="Příprava nabídky"
                fill
                className="rounded-lg shadow-xl object-cover"
              />
                  </div>
                </div>

          {/* KROK 3 - Střed vlny (x=48%, y=35%) - NAD vlnou */}
          <div className="absolute" style={{ left: '49.7%', top: '23%', transform: 'translateX(-50%)' }}>
            {/* Obrázek nahoře */}
            <div className="relative mx-auto mb-3" style={{ width: '14em', height: '14em' }}>
              <Image
                src="/03.jpg"
                alt="Výběr vozidla"
                fill
                className="rounded-lg shadow-xl object-cover"
              />
            </div>
            {/* Text pod obrázkem */}
            <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-xl" style={{ paddingLeft: '1em', paddingTop: '0.8em', paddingBottom: '0.8em', paddingRight: '1em' }}>
              <div className="flex items-center mb-1" style={{ gap: '0.7em' }}>
                <span className="text-[#cfb270] font-light" style={{ fontSize: '2.2em', lineHeight: '1' }}>03</span>
                <h4 className="font-semibold text-[#cfb270]" style={{ fontSize: '1em', lineHeight: '1.2' }}>
                  Výběr<br />vozidla
                </h4>
              </div>
              <p className="text-white" style={{ fontSize: '0.8em', lineHeight: '1.5', maxWidth: '15em' }}>
                Klientovi posíláme aktuální odkazy na vozidla, která splňují jeho požadavky, včetně ceny. Následně s klientem vše konzultujeme, čímž se sám podílí na výběru vozidla.
              </p>
            </div>
          </div>

          {/* KROK 4 - Druhý propad vlny (x=68%, y=52%) - POD vlnou */}
          <div className="absolute" style={{ left: '60%', top: '55%' }}>
            {/* Text nahoře */}
            <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-xl mb-3" style={{ paddingLeft: '1em', paddingTop: '0.8em', paddingBottom: '0.8em', paddingRight: '1em' }}>
              <div className="flex items-center mb-1" style={{ gap: '0.7em' }}>
                <span className="text-[#cfb270] font-light" style={{ fontSize: '2.2em', lineHeight: '1' }}>04</span>
                <h4 className="font-semibold text-[#cfb270]" style={{ fontSize: '1em', lineHeight: '1.2' }}>
                  Prohlídka<br />vozidla
                </h4>
              </div>
              <p className="text-white" style={{ fontSize: '0.8em', lineHeight: '1.5', maxWidth: '15em' }}>
                Po kompletní prohlídce a zkušební jízdě vozidlo buď doporučíme ke koupi nebo hledáme další vhodné vozidlo.
              </p>
            </div>
            {/* Obrázek dole */}
            <div className="relative mx-auto" style={{ width: '14em', height: '14em' }}>
              <Image
                src="/04.jpg"
                alt="Prohlídka vozidla"
                fill
                className="rounded-lg shadow-xl object-cover"
              />
          </div>
        </div>

          {/* KROK 5 - Konec vlny (x=92%, y=35%) - NAD vlnou - posunutý doprava */}
          <div className="absolute" style={{ right: '2%', top: '23%' }}>
            {/* Obrázek nahoře */}
            <div className="relative mx-auto mb-3" style={{ width: '14em', height: '14em' }}>
          <Image
                src="/05.jpg"
                alt="Příprava k předání"
            fill
                className="rounded-lg shadow-xl object-cover"
          />
        </div>
            {/* Text pod obrázkem */}
            <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-xl" style={{ paddingLeft: '1em', paddingTop: '0.8em', paddingBottom: '0.8em', paddingRight: '1em' }}>
              <div className="flex items-center mb-1" style={{ gap: '0.7em' }}>
                <span className="text-[#cfb270] font-light" style={{ fontSize: '2.2em', lineHeight: '1' }}>05</span>
                <h4 className="font-semibold text-[#cfb270]" style={{ fontSize: '1em', lineHeight: '1.2' }}>
                  Příprava k<br />předání
                </h4>
              </div>
              <p className="text-white" style={{ fontSize: '0.8em', lineHeight: '1.5', maxWidth: '15em' }}>
                Po dovozu vozidlo ihned servisujeme a připravujeme k předání, včetně veškeré administrativy spojené s dovozem (STK+ME, přidělení SPZ). Vy se nemusíte o nic starat.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>

        {/* Mobilní verze - vertikální timeline s obrázky */}
        <div className="lg:hidden relative z-20 py-8">
          <div className="max-w-[600px] mx-auto px-4 relative">
            
            {/* Vertikální SVG silnice s velkými půloblouky na pozadí */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[300px] overflow-visible pointer-events-none" style={{ zIndex: 0 }}>
              <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 300 1000" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Levý okraj silnice - extra velké serpentiny */}
                <path 
                  d="M 150 0 
                     Q 50 100 150 200 
                     Q 250 300 150 400 
                     Q 50 500 150 600 
                     Q 250 700 150 800 
                     Q 120 900 150 1000" 
                  stroke="url(#gradientVerticalMobile)" 
                  strokeWidth="2" 
                  fill="none"
                  opacity="0.4"
                />
                
                {/* Pravý okraj silnice - extra velké serpentiny */}
                <path 
                  d="M 180 0 
                     Q 80 100 180 200 
                     Q 280 300 180 400 
                     Q 80 500 180 600 
                     Q 280 700 180 800 
                     Q 150 900 180 1000" 
                  stroke="url(#gradientVerticalMobile)" 
                  strokeWidth="2" 
                  fill="none"
                  opacity="0.4"
                />
                
                {/* Středová čárkovaná čára - extra velké serpentiny */}
                <path 
                  d="M 165 0 
                     Q 65 100 165 200 
                     Q 265 300 165 400 
                     Q 65 500 165 600 
                     Q 265 700 165 800 
                     Q 135 900 165 1000" 
                  stroke="url(#gradientVerticalMobile)" 
                  strokeWidth="2" 
                  fill="none"
                  opacity="0.6"
                  strokeDasharray="15 15"
                />
                
                {/* Gradient definice */}
                <defs>
                  <linearGradient id="gradientVerticalMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#cfb270', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#d4ba7f', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#cfb270', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
              </div>
            
            <div className="space-y-8 relative" style={{ zIndex: 1 }}>
            
            {/* Krok 1 - Obrázek vlevo, text vpravo */}
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/01.jpg"
                  alt="Osobní setkání"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-light text-[#cfb270]">01</span>
                    <h4 className="text-base font-semibold text-[#cfb270]">Osobní setkání</h4>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                Preferujeme osobní setkání, kde si vysvětlíme, jak budeme při dovozu vozidla postupovat. V případě větší vzdálenosti konzultujeme telefonicky (dovážíme vozidla po celé ČR).
              </p>
                </div>
              </div>
              </div>
              
            {/* Krok 2 - Text vlevo, obrázek vpravo */}
            <div className="flex gap-4 items-start flex-row-reverse">
              <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/02.jpg"
                  alt="Příprava nabídky"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="border-r-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-l-lg shadow-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2 flex-row-reverse">
                    <span className="text-2xl font-light text-[#cfb270]">02</span>
                    <h4 className="text-base font-semibold text-[#cfb270]">Příprava nabídky</h4>
                  </div>
                  <p className="text-white text-xs leading-relaxed text-right">
                Před odjezdem do Německa Vám pošleme konkrétní nabídky vozidel, které pojedeme osobně prověřit.
              </p>
                </div>
              </div>
              </div>
              
            {/* Krok 3 - Obrázek vlevo, text vpravo */}
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/03.jpg"
                  alt="Výběr vozidla"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-light text-[#cfb270]">03</span>
                    <h4 className="text-base font-semibold text-[#cfb270]">Výběr vozidla</h4>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                Klientovi posíláme aktuální odkazy na vozidla, která splňují jeho požadavky, včetně ceny. Následně s klientem vše konzultujeme, čímž se sám podílí na výběru vozidla.
              </p>
                </div>
              </div>
              </div>
              
            {/* Krok 4 - Text vlevo, obrázek vpravo */}
            <div className="flex gap-4 items-start flex-row-reverse">
              <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/04.jpg"
                  alt="Prohlídka vozidla"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="border-r-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-l-lg shadow-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2 flex-row-reverse">
                    <span className="text-2xl font-light text-[#cfb270]">04</span>
                    <h4 className="text-base font-semibold text-[#cfb270]">Prohlídka vozidla</h4>
                  </div>
                  <p className="text-white text-xs leading-relaxed text-right">
                Po kompletní prohlídce a zkušební jízdě vozidlo buď doporučíme ke koupi nebo hledáme další vhodné vozidlo.
              </p>
                </div>
              </div>
              </div>
              
            {/* Krok 5 - Obrázek vlevo, text vpravo */}
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/05.jpg"
                  alt="Příprava k předání"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-light text-[#cfb270]">05</span>
                    <h4 className="text-base font-semibold text-[#cfb270]">Příprava k předání</h4>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    Po dovozu vozidlo ihned servisujeme a připravujeme k předání, včetně veškeré administrativy spojené s dovozem (STK+ME, přidělení SPZ). Vy se nemusíte o nic starat.
                  </p>
                </div>
              </div>
            </div>
            
            </div>
          </div>
        </div>
      </section>

      {/* Proč zvolit nás Section */}
      <section id="o-nas" className="py-8 sm:py-12 lg:py-16 xl:py-20 relative z-50" style={{ backgroundColor: '#353434' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 sm:mb-12 lg:mb-16 text-center">
            Proč zvolit nás?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Zkušenosti */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 relative">
        <Image
                  src="/video/ikona-osoba-palec.svg"
                  alt="Zkušenosti"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4" style={{ color: '#cfb270' }}>Zkušenosti</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Při výběru vozidel využíváme dlouholeté znalosti a zkušenosti s německým automobilovým trhem.
              </p>
            </div>

            {/* Původ automobilu */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 relative">
                <Image
                  src="/video/ikona-rychlomer.svg"
                  alt="Původ automobilu"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4" style={{ color: '#cfb270' }}>Původ automobilu</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                U všech vozidel prověřujeme stav najetých kilometrů, které klientovi kompletně dokládáme v podobě servisní knihy, německé STK. Všechna vozidla osobně prověřujeme, prioritou je původ a historie vozidla.
              </p>
            </div>

            {/* Naše standardy */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 relative">
                <Image
                  src="/video/ikona-auto.svg"
                  alt="Naše standardy"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4" style={{ color: '#cfb270' }}>Naše standardy</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Pokud vozidlo nevyhovuje našemu standardu z jakéhokoliv důvodu, AUTO NEKUPUJEME a pokračujeme v DALŠÍM HLEDÁNÍ.
              </p>
            </div>

            {/* 100% Důvěra */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 relative">
                <Image
                  src="/video/ikona-certifikat.svg"
                  alt="100% Důvěra"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4" style={{ color: '#cfb270' }}>100% Důvěra</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Dovážíme jen taková vozidla, o kterých jsme přesvědčeni, že splňují požadované parametry.
              </p>
            </div>

            {/* Váš komfort */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 relative">
                <Image
                  src="/video/ikona-klic.svg"
                  alt="Váš komfort"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4" style={{ color: '#cfb270' }}>Váš komfort</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Naše práce nekončí výběrem a nákupem vozidla, ale zařizujeme i služby související s dovozem ze zahraničí (transport do ČR, STK + ME, servis, vystavení českých dokladů a přidělení SPZ). Vy si jen převezmete kompletně připravené vozidlo.
              </p>
            </div>

            {/* Doplňkové služby */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 relative">
                <Image
                  src="/video/ikona-zakaznik.svg"
                  alt="Doplňkové služby"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4" style={{ color: '#cfb270' }}>Doplňkové služby</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Zajišťujeme pro Vás také pojištění vozidel, likvidace pojistných událostí, pravidelný servis vozidel, pravidelnou STK + ME, vozidel, odtahy vozidel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aktuálně předaná vozidla Section */}
      <section id="vozidla" className="py-8 sm:py-12 lg:py-16 bg-white relative z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 mb-6 sm:mb-8">
            Aktuálně předaná vozidla našim zákazníkům
          </h2>
          
          {/* Karusel s vozidly */}
          <div className="relative mb-8 sm:mb-10">
            {/* Šipka vlevo */}
            {carouselIndex > 0 && (
              <button
                onClick={() => setCarouselIndex(carouselIndex - 1)}
                className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 sm:p-4 rounded-full transition-all shadow-lg"
                aria-label="Předchozí vozidla"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Container s overflow */}
            <div 
              className="overflow-hidden px-4 sm:px-12 lg:px-20" 
              ref={carouselRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4"
                style={{ 
                  transform: isMobile 
                    ? `translateX(calc(-${carouselIndex} * (70% + 0.75rem)))`
                    : `translateX(calc(-${carouselIndex} * (25% + 0.1875rem)))`
                }}
              >
                {Object.entries(carsData).map(([key, car]) => (
                  <div 
                    key={key} 
                    onClick={() => setSelectedCar(key)} 
                    className="group cursor-pointer flex-shrink-0"
                    style={{ 
                      width: isMobile ? 'calc(70% - 0.375rem)' : 'calc(25% - 0.5625rem)'
                    }}
                  >
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={car.images[0]}
                        alt={car.name}
                        width={250}
                        height={250}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        quality={75}
                      />
                    </div>
                    <p className="text-center text-sm font-medium mt-1.5 sm:mt-2 text-gray-700 group-hover:text-[#cfb270] transition">{car.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Šipka vpravo */}
            {carouselIndex < (isMobile ? Object.keys(carsData).length - 1 : Object.keys(carsData).length - 4) && (
              <button
                onClick={() => setCarouselIndex(Math.min(isMobile ? Object.keys(carsData).length - 1 : Object.keys(carsData).length - 4, carouselIndex + 1))}
                className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 sm:p-4 rounded-full transition-all shadow-lg"
                aria-label="Další vozidla"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Tlačítka */}
          <div className="text-center flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/vozidla" 
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#cfb270] text-black font-medium hover:bg-[#d4ba7f] transition text-sm sm:text-base"
            >
              Všechna dovezená vozidla
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="#formular" 
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-medium hover:bg-gray-800 transition text-sm sm:text-base"
            >
              Chci dovést podobné vozidlo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Kontakt a Formulář Section */}
      <section id="kontakt" className="py-12 sm:py-16 lg:py-20 relative z-50 overflow-hidden" style={{ backgroundColor: '#c1ac68' }}>
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10 mix-blend-multiply">
          <Image
            src="/komfortcars_background.png.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
          </div>
          
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Levá strana - Kontakt */}
            <div className="text-gray-900">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 sm:mb-8">Kontakt</h2>
              
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg">
                {/* Provozovna */}
                <div>
                  <p className="font-medium mb-1 text-lg sm:text-xl">Provozovna:</p>
                  <p className="text-lg sm:text-xl">KOMFORTCARS</p>
                  <p className="text-lg sm:text-xl">Ostravská 494, Sviadnov 739 25</p>
            </div>
            
                {/* Fakturační údaje */}
            <div>
                  <p className="font-medium mb-1 text-lg sm:text-xl">Fakturační údaje:</p>
                  <p className="text-lg sm:text-xl">Josef Bystřičan</p>
                  <p className="text-lg sm:text-xl">Chlebovice 269, Frýdek-Místek 739 42</p>
            </div>
            
                {/* IČO a DIČ */}
            <div>
                  <p className="text-lg sm:text-xl">IČO: 69236356</p>
                  <p className="text-lg sm:text-xl">DIČ: CZ7908094942</p>
            </div>
            
                {/* Kontaktní údaje */}
            <div>
                  <p className="text-xl sm:text-2xl font-medium">+420 608 808 285</p>
                  <p className="text-xl sm:text-2xl font-medium">+420 608 200 021</p>
                  <p className="text-lg sm:text-xl">info@komfortcars.cz</p>
                </div>
              </div>
            </div>
            
            {/* Pravá strana - Formulář */}
            <div id="formular">
              <h2 id="formular-nadpis" className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 sm:mb-6">
                Mám zájem o dovoz auta
              </h2>
              
              <form className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                  placeholder="Jméno a příjmení"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition text-sm sm:text-base"
                />
                
                  <input
                    type="tel"
                  placeholder="Telefon"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition text-sm sm:text-base"
                />
                
                  <input
                    type="email"
                  placeholder="E-mail"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition text-sm sm:text-base"
                />
                
                <input
                  type="text"
                  placeholder="Typ automobilu"
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition text-sm sm:text-base"
                />
                
                  <textarea
                  placeholder="Informace o požadovaném autu"
                  rows={4}
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition resize-none text-sm sm:text-base"
                />
                
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 accent-black flex-shrink-0"
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-gray-900">
                    Souhlasím se všeobecnými obchodními podmínkami
                  </label>
                </div>

                  <button
                    type="submit"
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-medium hover:bg-gray-800 transition text-sm sm:text-base"
                  >
                    Odeslat
                  </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Recenze Section - Google Style */}
      <section className="bg-[#f1f1f1] py-12 sm:py-16 lg:py-20 relative z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Co říkají naši zákazníci
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-normal text-gray-900">{googleRating.toFixed(1)}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl sm:text-2xl text-yellow-500">★</span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Na základě {totalReviews} hodnocení</p>
          </div>

          {/* Carousel s recenzemi */}
          <div className="relative px-0 sm:px-12 lg:px-16">
            {/* Navigační šipky - skryté na mobilech, viditelné na tabletech a desktopu */}
            <button
              onClick={prevReview}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full shadow-lg items-center justify-center transition border-2 hover:scale-110"
              style={{ backgroundColor: '#353434', borderColor: '#cfb270' }}
              aria-label="Předchozí recenze"
            >
              <span className="text-white text-2xl font-light">‹</span>
            </button>

            <button
              onClick={nextReview}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full shadow-lg items-center justify-center transition border-2 hover:scale-110"
              style={{ backgroundColor: '#353434', borderColor: '#cfb270' }}
              aria-label="Další recenze"
            >
              <span className="text-white text-2xl font-light">›</span>
            </button>

            {/* Recenze cards */}
            <div className="overflow-hidden">
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500"
                style={{ transform: `translateX(0)` }}
              >
                {/* Na mobilu zobrazíme pouze jednu recenzi, na tabletech 2, na desktopu 3 */}
                {[0, 1, 2].map((offset) => {
                  const activeReviews = googleReviews.length > 0 ? googleReviews : reviewsData;
                  const review = activeReviews[(currentReviewIndex + offset) % activeReviews.length];
                  
                  // Google API formát vs manuální formát
                  const authorName = review.author_name || review.name;
                  const authorPhoto = review.profile_photo_url;
                  const rating = review.rating;
                  const text = review.text;
                  const timeDescription = review.relative_time_description || review.date;
                  
                  return (
                    <div 
                      key={`${currentReviewIndex}-${offset}`} 
                      className={`bg-white border border-gray-200 p-4 sm:p-5 rounded-lg hover:shadow-md transition-shadow ${
                        offset > 0 ? 'hidden md:block' : ''
                      } ${offset > 1 ? 'hidden lg:block' : ''}`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        {authorPhoto ? (
                          <Image 
                            src={`/api/proxy-image?url=${encodeURIComponent(authorPhoto)}`}
                            alt={authorName}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                            {(review.initial || authorName?.charAt(0) || '?').toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">{authorName}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            {[...Array(rating)].map((_, i) => (
                              <span key={i} className="text-yellow-500 text-base">★</span>
                            ))}
                            {[...Array(5 - rating)].map((_, i) => (
                              <span key={i} className="text-gray-300 text-base">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{timeDescription}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                        {text}
                      </p>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <Image src="/globe.svg" alt="Zveřejněno na Google" width={12} height={12} className="inline opacity-40" />
                        <span className="text-xs text-gray-400 ml-1">Zveřejněno na Google</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Indikátory */}
            <div className="flex justify-center gap-2 mt-6">
              {(googleReviews.length > 0 ? googleReviews : reviewsData).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReviewIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentReviewIndex ? 'w-8' : 'w-2'
                  }`}
                  style={{ backgroundColor: idx === currentReviewIndex ? '#cfb270' : '#d1d5db' }}
                  aria-label={`Přejít na recenzi ${idx + 1}`}
                />
              ))}
            </div>
            
            {/* Navigační tlačítka pro mobil */}
            <div className="flex sm:hidden justify-center gap-4 mt-4">
              <button
                onClick={prevReview}
                className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition border-2 active:scale-95"
                style={{ backgroundColor: '#353434', borderColor: '#cfb270' }}
                aria-label="Předchozí recenze"
              >
                <span className="text-white text-2xl font-light">‹</span>
              </button>
              <button
                onClick={nextReview}
                className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition border-2 active:scale-95"
                style={{ backgroundColor: '#353434', borderColor: '#cfb270' }}
                aria-label="Další recenze"
              >
                <span className="text-white text-2xl font-light">›</span>
              </button>
            </div>
          </div>

          {/* Odkaz na Google */}
          <div className="text-center mt-8 sm:mt-10">
            <a 
              href="https://www.google.com/search?q=KomfortCars+Dovoz+vozidel+na+objednávku+Recenze" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all hover:scale-105"
              style={{ backgroundColor: '#cfb270', color: '#000' }}
            >
              <Image src="/globe.svg" alt="Google" width={16} height={16} />
              Zobrazit všechny recenze na Google
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
              © 2024 Dovoz aut z Německa | KomfortCars
            </p>
          </div>
        </div>
      </footer>

      {/* Modal pro detail vozidla */}
      {selectedCar && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-1 sm:p-3 lg:p-4 overflow-y-auto"
          onClick={() => setSelectedCar(null)}
          style={{ overflowY: 'auto' }}
        >
          <div 
            className="bg-[#353434] max-w-5xl w-full rounded-lg overflow-hidden relative my-1 sm:my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zavírací tlačítko */}
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-1 right-1 sm:top-4 sm:right-4 z-[110] w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-black/70 hover:bg-black/90 rounded-full text-white text-2xl sm:text-4xl font-light hover:text-[#cfb270] transition-all shadow-lg"
              aria-label="Zavřít"
            >
              ×
            </button>

            <div className="p-2 sm:p-6 lg:p-12">
              <div className="mb-3 sm:mb-8 pr-6 sm:pr-8">
                <h2 className="text-lg sm:text-3xl lg:text-4xl font-light text-white" style={{ color: '#cfb270' }}>
                  {carsData[selectedCar as keyof typeof carsData].name}
                </h2>
                {carsData[selectedCar as keyof typeof carsData].type && (
                  <p className="text-gray-300 text-sm sm:text-xl mt-1 sm:mt-2">
                    {carsData[selectedCar as keyof typeof carsData].type}
                  </p>
                )}
              </div>

              {/* Grid fotky */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-8">
                {carsData[selectedCar as keyof typeof carsData].images.map((img, idx) => (
                  <div key={idx} className="aspect-video relative overflow-hidden rounded-lg">
                    <Image
                      src={img}
                      alt={`${carsData[selectedCar as keyof typeof carsData].name} ${idx + 1}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                ))}
              </div>

              {/* Specifikace - jednoduchý formát */}
              <div className="border-l-2 pl-2 sm:pl-6 mb-3 sm:mb-8" style={{ borderColor: '#cfb270' }}>
                <h3 className="text-sm sm:text-xl font-medium mb-1 sm:mb-4" style={{ color: '#cfb270' }}>Specifikace</h3>
                <p className="text-white text-sm sm:text-2xl font-light">
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
                  href="#formular" 
                  onClick={() => setSelectedCar(null)}
                  className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-8 py-2 sm:py-4 font-medium hover:bg-[#d4ba7f] transition text-xs sm:text-base"
                  style={{ backgroundColor: '#cfb270', color: '#000' }}
                >
                  Chci dovést podobné vozidlo
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
