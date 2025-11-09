'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Data vozidel
const carsData = {
  staria: {
    name: "Hyundai Staria",
    images: ["/staria.jpg", "/1-17.png", "/4-18.png", "/4-18.png"],
    specs: [
      "Rok výroby: 2023",
      "Motor: 2.2 CRDi",
      "Výkon: 130 kW",
      "Km: 15 000 km",
      "Kompletní servisní historie"
    ]
  },
  kodiaq: {
    name: "Škoda Kodiaq",
    images: ["/kodiaq1-1.jpg", "/kodiaq1-1.jpg", "/kodiaq1-1.jpg", "/kodiaq1-1.jpg"],
    specs: [
      "Rok výroby: 2022",
      "Motor: 2.0 TDI",
      "Výkon: 110 kW",
      "Km: 28 000 km",
      "Kompletní výbava"
    ]
  },
  bmw: {
    name: "BMW",
    images: ["/bmw1.png", "/bmw2.png", "/bmw3.png", "/bmw2.png"],
    specs: [
      "Rok výroby: 2021",
      "Motor: 2.0i",
      "Výkon: 135 kW",
      "Km: 32 000 km",
      "Prověřený původ"
    ]
  },
  arteon: {
    name: "Volkswagen Arteon",
    images: ["/2-18.png", "/arteon2.jpg", "/4-12.jpg", "/4-18.png"],
    specs: [
      "Rok výroby: 2022",
      "Motor: 2.0 TSI R-line",
      "Výkon: 140 kW",
      "Km: 22 000 km",
      "Plná výbava R-line"
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
  const [isVideoRevealed, setIsVideoRevealed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [googleReviews, setGoogleReviews] = useState<any[]>([]);
  const [googleRating, setGoogleRating] = useState<number>(4.9);
  const [totalReviews, setTotalReviews] = useState<number>(63);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Spustit animaci odhalení videa po načtení stránky
    const timer = setTimeout(() => {
      setIsVideoRevealed(true);
    }, 100);

    return () => clearTimeout(timer);
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

  useEffect(() => {
    let rafId: number | null = null;
    
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollTop < windowHeight) {
        const progress = Math.min(scrollTop / windowHeight, 1);
        setScrollProgress(progress);
      } else {
        setScrollProgress(1);
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateScrollProgress();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const prevReview = () => {
    const totalLength = googleReviews.length > 0 ? googleReviews.length : reviewsData.length;
    setCurrentReviewIndex((prev) => (prev - 1 + totalLength) % totalLength);
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
            </div>
          </div>
        )}
      </nav>

      {/* Spacer pro scroll efekt */}
      <div className="h-[200vh]"></div>

      {/* Hero Section - Hlavní video - Fixed */}
      <section 
        className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-black"
        style={{ 
          zIndex: 20,
          pointerEvents: scrollProgress >= 1 ? 'none' : 'auto',
          willChange: 'transform'
        }}
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
          style={{ transform: 'scale(1)', objectPosition: 'center' }}
        >
          <source src="/video_finall.mp4" type="video/mp4" />
        </video>
        
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

      {/* Video Section - Elektrická mobilita - Fixed, vyjíždí zdola */}
      <section 
        className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-black"
        style={{ 
          transform: `translateY(${(1 - scrollProgress) * 100}%)`,
          zIndex: 30,
          willChange: 'transform'
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
          style={{ transform: 'scale(1)', objectPosition: 'center' }}
        >
          <source src="/elektro.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6">
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

      {/* Spacer po crossfade efektu */}
      <div className="h-screen"></div>

      {/* Jak to probíhá Section */}
<section id="jak-to-probiha" className="relative z-50 overflow-hidden pt-8 sm:pt-12 pb-12 sm:pb-16" style={{ backgroundColor: '#353434' }}>
  {/* Nadpis */}
  <div className="relative z-20 pb-4 sm:pb-6">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white text-center">
        Jak to u nás probíhá?
      </h3>
    </div>
  </div>

  {/* Hlavní kontejner */}
  <div className="hidden lg:block relative w-full max-w-[1920px] mx-auto px-6">
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
        <div className="absolute inset-0" style={{ fontSize: 'clamp(10px, 1vw, 18px)' }}>
          
          {/* KROK 1 - Start vlny (x=0-15%, y=35%) - NAD vlnou */}
          <div className="absolute" style={{ left: '5%', top: '23%' }}>
            {/* Obrázek nahoře */}
            <div className="relative mx-auto mb-3" style={{ width: '11em', height: '11em' }}>
              <Image
                src="/01.jpg"
                alt="Specifikace vozidla"
                fill
                className="rounded-lg shadow-xl object-cover"
              />
            </div>
            {/* Text pod obrázkem */}
            <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-xl" style={{ paddingLeft: '1em', paddingTop: '0.8em', paddingBottom: '0.8em', paddingRight: '1em' }}>
              <div className="flex items-center mb-1" style={{ gap: '0.7em' }}>
                <span className="text-[#cfb270] font-light" style={{ fontSize: '2.2em', lineHeight: '1' }}>01</span>
                <h4 className="font-semibold text-[#cfb270]" style={{ fontSize: '1em', lineHeight: '1.2' }}>
                  Specifikace<br />vozidla
                </h4>
              </div>
              <p className="text-white" style={{ fontSize: '0.8em', lineHeight: '1.5', maxWidth: '15em' }}>
                První konzultace proběhne u nás, nebo v případě větší vzdálenosti telefonicky.
              </p>
                  </div>
                </div>

          {/* KROK 2 - První propad vlny (x=22%, y=52%) - POD vlnou */}
          <div className="absolute" style={{ left: '26%', top: '55%' }}>
            {/* Text nahoře */}
            <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-xl mb-3" style={{ paddingLeft: '1em', paddingTop: '0.8em', paddingBottom: '0.8em', paddingRight: '1em' }}>
              <div className="flex items-center mb-1" style={{ gap: '0.7em' }}>
                <span className="text-[#cfb270] font-light" style={{ fontSize: '2.2em', lineHeight: '1' }}>02</span>
                <h4 className="font-semibold text-[#cfb270]" style={{ fontSize: '1em', lineHeight: '1.2' }}>
                  Hledání<br />vozidla
                </h4>
              </div>
              <p className="text-white" style={{ fontSize: '0.8em', lineHeight: '1.5', maxWidth: '15em' }}>
                Posíláme konkrétní nabídky vozidel k osobní kontrole.
              </p>
            </div>
            {/* Obrázek dole */}
            <div className="relative mx-auto" style={{ width: '11em', height: '11em' }}>
              <Image
                src="/02.jpg"
                alt="Hledání vozidla"
                fill
                className="rounded-lg shadow-xl object-cover"
              />
                  </div>
                </div>

          {/* KROK 3 - Střed vlny (x=50%, y=35%) - NAD vlnou */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '23%' }}>
            {/* Obrázek nahoře */}
            <div className="relative mx-auto mb-3" style={{ width: '11em', height: '11em' }}>
              <Image
                src="/03.jpg"
                alt="Odjezd do Německa"
                fill
                className="rounded-lg shadow-xl object-cover"
              />
            </div>
            {/* Text pod obrázkem */}
            <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-xl" style={{ paddingLeft: '1em', paddingTop: '0.8em', paddingBottom: '0.8em', paddingRight: '1em' }}>
              <div className="flex items-center mb-1" style={{ gap: '0.7em' }}>
                <span className="text-[#cfb270] font-light" style={{ fontSize: '2.2em', lineHeight: '1' }}>03</span>
                <h4 className="font-semibold text-[#cfb270]" style={{ fontSize: '1em', lineHeight: '1.2' }}>
                  Odjezd do<br />Německa
                </h4>
              </div>
              <p className="text-white" style={{ fontSize: '0.8em', lineHeight: '1.5', maxWidth: '15em' }}>
                Posíláme odkazy a ceny vozidel s možností účasti klienta.
              </p>
            </div>
          </div>

          {/* KROK 4 - Druhý propad vlny (x=68%, y=52%) - POD vlnou */}
          <div className="absolute" style={{ left: '64%', top: '55%' }}>
            {/* Text nahoře */}
            <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-xl mb-3" style={{ paddingLeft: '1em', paddingTop: '0.8em', paddingBottom: '0.8em', paddingRight: '1em' }}>
              <div className="flex items-center mb-1" style={{ gap: '0.7em' }}>
                <span className="text-[#cfb270] font-light" style={{ fontSize: '2.2em', lineHeight: '1' }}>04</span>
                <h4 className="font-semibold text-[#cfb270]" style={{ fontSize: '1em', lineHeight: '1.2' }}>
                  Prohlídka<br />vozidla
                </h4>
              </div>
              <p className="text-white" style={{ fontSize: '0.8em', lineHeight: '1.5', maxWidth: '15em' }}>
                Kompletní prohlídka a zkušební jízda s technikem.
              </p>
            </div>
            {/* Obrázek dole */}
            <div className="relative mx-auto" style={{ width: '11em', height: '11em' }}>
              <Image
                src="/04.jpg"
                alt="Prohlídka vozidla"
                fill
                className="rounded-lg shadow-xl object-cover"
              />
          </div>
        </div>

          {/* KROK 5 - Konec vlny (x=90%, y=35%) - NAD vlnou */}
          <div className="absolute" style={{ right: '5%', top: '23%' }}>
            {/* Obrázek nahoře */}
            <div className="relative mx-auto mb-3" style={{ width: '11em', height: '11em' }}>
          <Image
                src="/05.jpg"
                alt="Předání vozidla"
            fill
                className="rounded-lg shadow-xl object-cover"
          />
        </div>
            {/* Text pod obrázkem */}
            <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-xl" style={{ paddingLeft: '1em', paddingTop: '0.8em', paddingBottom: '0.8em', paddingRight: '1em' }}>
              <div className="flex items-center mb-1" style={{ gap: '0.7em' }}>
                <span className="text-[#cfb270] font-light" style={{ fontSize: '2.2em', lineHeight: '1' }}>05</span>
                <h4 className="font-semibold text-[#cfb270]" style={{ fontSize: '1em', lineHeight: '1.2' }}>
                  Předání<br />vozidla
                </h4>
              </div>
              <p className="text-white" style={{ fontSize: '0.8em', lineHeight: '1.5', maxWidth: '15em' }}>
                Servisujeme, připravujeme a vyřizujeme vše potřebné - STK, emise, SPZ po dovozu.
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
                  alt="Specifikace vozidla"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-light text-[#cfb270]">01</span>
                    <h4 className="text-base font-semibold text-[#cfb270]">Specifikace vozidla</h4>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    První konzultace proběhne u nás, nebo v případě větší vzdálenosti telefonicky.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Krok 2 - Text vlevo, obrázek vpravo */}
            <div className="flex gap-4 items-start flex-row-reverse">
              <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/02.jpg"
                  alt="Hledání vozidla"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="border-r-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-l-lg shadow-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2 flex-row-reverse">
                    <span className="text-2xl font-light text-[#cfb270]">02</span>
                    <h4 className="text-base font-semibold text-[#cfb270]">Hledání vozidla</h4>
                  </div>
                  <p className="text-white text-xs leading-relaxed text-right">
                    Posíláme konkrétní nabídky vozidel k osobní kontrole.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Krok 3 - Obrázek vlevo, text vpravo */}
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/03.jpg"
                  alt="Odjezd do Německa"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-light text-[#cfb270]">03</span>
                    <h4 className="text-base font-semibold text-[#cfb270]">Odjezd do Německa</h4>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    Posíláme odkazy a ceny vozidel s možností účasti klienta.
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
                    Kompletní prohlídka a zkušební jízda s technikem.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Krok 5 - Obrázek vlevo, text vpravo */}
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/05.jpg"
                  alt="Předání vozidla"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="border-l-4 border-[#cfb270] bg-[#353434]/90 backdrop-blur-sm rounded-r-lg shadow-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-light text-[#cfb270]">05</span>
                    <h4 className="text-base font-semibold text-[#cfb270]">Předání vozidla</h4>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    Servisujeme, připravujeme a vyřizujeme vše potřebné - STK, emise, SPZ po dovozu.
                  </p>
                </div>
              </div>
            </div>
            
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] z-50 bg-white">
        <Image
          src="/background1.jpg"
          alt="Komfort Cars"
          fill
          className="object-cover brightness-140"
          quality={100}
          unoptimized
        />
      </section>

      {/* Aktuálně předaná vozidla Section */}
      <section id="vozidla" className="py-8 sm:py-12 lg:py-16 bg-white relative z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 mb-6 sm:mb-8">
            Aktuálně předaná vozidla našim zákazníkům
          </h2>
          
          {/* Galerie vozidel */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto mb-8 sm:mb-10">
            {/* Vozidlo 1 */}
            <div onClick={() => setSelectedCar('staria')} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/staria.jpg"
                  alt="Hyundai Staria"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <p className="text-center text-xs sm:text-sm font-medium mt-1.5 sm:mt-2 text-gray-700 group-hover:text-[#cfb270] transition">Hyundai Staria</p>
            </div>

            {/* Vozidlo 2 */}
            <div onClick={() => setSelectedCar('kodiaq')} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/kodiaq1-1.jpg"
                  alt="Škoda Kodiaq"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <p className="text-center text-xs sm:text-sm font-medium mt-1.5 sm:mt-2 text-gray-700 group-hover:text-[#cfb270] transition">Škoda Kodiaq</p>
            </div>
            
            {/* Vozidlo 3 */}
            <div onClick={() => setSelectedCar('bmw')} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/bmw1.png"
                  alt="BMW"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <p className="text-center text-xs sm:text-sm font-medium mt-1.5 sm:mt-2 text-gray-700 group-hover:text-[#cfb270] transition">BMW</p>
            </div>
            
            {/* Vozidlo 4 */}
            <div onClick={() => setSelectedCar('arteon')} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/2-18.png"
                  alt="Volkswagen Arteon"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <p className="text-center text-xs sm:text-sm font-medium mt-1.5 sm:mt-2 text-gray-700 group-hover:text-[#cfb270] transition">Volkswagen Arteon</p>
            </div>
          </div>

          {/* Tlačítko pro dovoz podobného vozidla */}
          <div className="text-center">
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
              
              <div className="space-y-4 sm:space-y-6 text-sm">
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
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setSelectedCar(null)}
        >
          <div 
            className="bg-[#353434] max-w-5xl w-full rounded-lg overflow-hidden relative my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zavírací tlačítko */}
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white text-3xl sm:text-4xl font-light hover:text-[#cfb270] transition z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            >
              ×
            </button>

            <div className="p-4 sm:p-6 lg:p-12 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-6 sm:mb-8 pr-8" style={{ color: '#cfb270' }}>
                {carsData[selectedCar as keyof typeof carsData].name}
              </h2>

              {/* Grid fotky */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {carsData[selectedCar as keyof typeof carsData].images.map((img, idx) => (
                  <div key={idx} className="aspect-video relative overflow-hidden rounded-lg">
                    <Image
                      src={img}
                      alt={`${carsData[selectedCar as keyof typeof carsData].name} ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>

              {/* Specifikace */}
              <div className="border-l-2 pl-4 sm:pl-6 mb-6 sm:mb-8" style={{ borderColor: '#cfb270' }}>
                <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4" style={{ color: '#cfb270' }}>Specifikace</h3>
                <ul className="space-y-2">
                  {carsData[selectedCar as keyof typeof carsData].specs.map((spec, idx) => (
                    <li key={idx} className="text-gray-300 text-xs sm:text-sm flex items-start">
                      <span className="mr-2 flex-shrink-0" style={{ color: '#cfb270' }}>•</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tlačítko pro dovoz podobného vozidla */}
              <div className="text-center">
                <a 
                  href="#formular" 
                  onClick={() => setSelectedCar(null)}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 font-medium hover:bg-[#d4ba7f] transition text-sm sm:text-base"
                  style={{ backgroundColor: '#cfb270', color: '#000' }}
                >
                  Chci dovést podobné vozidlo
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
