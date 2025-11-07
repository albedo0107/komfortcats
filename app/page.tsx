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
        
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center text-white px-6">
          <h2 className="text-5xl lg:text-7xl font-light tracking-wider text-center mb-6 drop-shadow-[0_6px_12px_rgba(0,0,0,1)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
            Dovážíme vozidla vašich          </h2>
          <p className="text-xl lg:text-2xl font-light tracking-wide mb-4 text-center max-w-3xl drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
            Spolehlivost, kvalita a individuální přístup k vašim potřebám
          </p>
          <p className="text-lg lg:text-xl font-light tracking-wide mb-12 text-center max-w-2xl drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
            Zkušenosti od roku 1999 • Přes 3000 spokojených zákazníků
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#vozidla" className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition text-center">
              Dovezená vozidla
            </a>
            <a href="#formular" className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium hover:bg-white/10 transition text-center">
              Chci dovést vozidlo
            </a>
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

      {/* Jak to probíhá Section */}
      <section id="jak-to-probiha" className="relative z-50 overflow-hidden min-h-[600px] pb-32" style={{ backgroundColor: '#353434' }}>
        {/* Nadpis v horní pětině */}
        <div className="relative z-20 pt-16 pb-8">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h3 className="text-3xl lg:text-4xl font-light text-white text-center">
              Jak to u nás probíhá?
            </h3>
          </div>
        </div>

        {/* Center Wave - roztažený přes celou výšku */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <Image
            src="/wave.svg"
            alt="Wave"
            fill
            className="object-cover"
          />
        </div>

        {/* Kroky rozmístěné podél wave křivky - DESKTOP */}
        <div className="hidden lg:block relative z-20">
          {/* Krok 1 - přesně vlevo, těsně nad křivkou */}
          <div className="absolute left-0 pl-2 top-[100px]">
            <div className="border-l-2 pl-6 max-w-[600px]" style={{ borderColor: '#cfb270' }}>
              <div className="flex gap-6 items-start">
                <div className="flex gap-4">
                  <span className="text-5xl font-light" style={{ color: '#cfb270' }}>01</span>
                  <h4 className="font-medium leading-tight" style={{ color: '#cfb270' }}>
                    <div className="text-base">Specifikace</div>
                    <div className="text-base">vozidla</div>
                  </h4>
                </div>
                <p className="text-white text-sm leading-relaxed flex-1 drop-shadow-md">
                  První konzultace proběhne u nás,<br />
                  nebo v případě větší vzdálenosti telefonicky.
                </p>
              </div>
            </div>
          </div>

          {/* Obrázek mezi bodem 1 a 2 */}
          <div className="absolute left-[8.7%] top-[190px]">
            <Image
              src="/01.jpg"
              alt="Ilustrace"
              width={160}
              height={160}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Obrázek 02.jpg mezi 01 a 03 */}
          <div className="absolute left-[26.9%] top-[-25px]">
            <Image
              src="/02.jpg"
              alt="Ilustrace"
              width={160}
              height={160}
              className="rounded-lg shadow-lg"
            />
          </div>
          
          {/* Krok 2 - první vrchol nahoru */}
          <div className="absolute left-[22%] top-[180px]">
            <div className="border-l-2 pl-6 max-w-[600px]" style={{ borderColor: '#cfb270' }}>
              <div className="flex gap-6 items-start">
                <div className="flex gap-4">
                  <span className="text-5xl font-light" style={{ color: '#cfb270' }}>02</span>
                  <h4 className="font-medium leading-tight" style={{ color: '#cfb270' }}>
                    <div className="text-base">Hledání</div>
                    <div className="text-base">vozidla</div>
                  </h4>
                </div>
                <p className="text-white text-sm leading-relaxed flex-1 drop-shadow-md">
                  Posíláme konkrétní nabídky vozidel<br />
                  k osobní kontrole.
                </p>
              </div>
                </div>
              </div>
              
          {/* Krok 3 - druhý vrchol dolů */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[100px]">
            <div className="border-l-2 pl-6 max-w-[600px]" style={{ borderColor: '#cfb270' }}>
              <div className="flex gap-6 items-start">
                <div className="flex gap-4">
                  <span className="text-5xl font-light" style={{ color: '#cfb270' }}>03</span>
                  <h4 className="font-medium leading-tight" style={{ color: '#cfb270' }}>
                    <div className="text-base">Odjezd</div>
                    <div className="text-base">do Německa</div>
                  </h4>
                </div>
                <p className="text-white text-sm leading-relaxed flex-1 drop-shadow-md">
                  Posíláme odkazy a ceny vozidel<br />
                  s možností účasti klienta.
                </p>
              </div>
            </div>
              </div>

          {/* Obrázek pod bodem 3 */}
          <div className="absolute left-[49.5%] -translate-x-1/2 top-[190px]">
            <Image
              src="/03.jpg"
              alt="Ilustrace"
              width={160}
              height={160}
              className="rounded-lg shadow-lg"
            />
              </div>
              
          {/* Krok 4 - druhý vrchol nahoru */}
          <div className="absolute left-[60%] top-[180px]">
            <div className="border-l-2 pl-6 max-w-[600px]" style={{ borderColor: '#cfb270' }}>
              <div className="flex gap-6 items-start">
                <div className="flex gap-4">
                  <span className="text-5xl font-light" style={{ color: '#cfb270' }}>04</span>
                  <h4 className="font-medium leading-tight" style={{ color: '#cfb270' }}>
                    <div className="text-base">Prohlídka</div>
                    <div className="text-base">vozidla</div>
                  </h4>
                </div>
                <p className="text-white text-sm leading-relaxed flex-1 drop-shadow-md">
                  Kompletní prohlídka<br />
                  a zkušební jízda s technikem.
                </p>
              </div>
            </div>
              </div>

          {/* Obrázek 04.jpg symetricky k 02.jpg */}
          <div className="absolute right-[28.1%] top-[-25px]">
            <Image
              src="/04.jpg"
              alt="Ilustrace"
              width={160}
              height={160}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Obrázek mezi bodem 4 a 5 */}
          <div className="absolute right-[9.7%] top-[190px]">
            <Image
              src="/05.jpg"
              alt="Ilustrace"
              width={160}
              height={160}
              className="rounded-lg shadow-lg"
            />
              </div>
              
          {/* Krok 5 - přesně vpravo */}
          <div className="absolute right-0 pr-8 top-[100px]">
            <div className="border-l-2 pl-6 max-w-[600px]" style={{ borderColor: '#cfb270' }}>
              <div className="flex gap-6 items-start">
                <div className="flex gap-4">
                  <span className="text-5xl font-light" style={{ color: '#cfb270' }}>05</span>
                  <h4 className="font-medium leading-tight" style={{ color: '#cfb270' }}>
                    <div className="text-base">Předání</div>
                    <div className="text-base">vozidla</div>
                  </h4>
                </div>
                <p className="text-white text-sm leading-relaxed flex-1 drop-shadow-md">
                  Servisujeme, připravujeme a vyřizujeme<br />
                  vše potřebné - STK, emise, SPZ po dovozu.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobilní verze - jednoduchý seznam */}
        <div className="lg:hidden relative z-20 py-8">
          <div className="max-w-[600px] mx-auto px-6 space-y-6">
            {/* Krok 1 */}
            <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-light" style={{ color: '#cfb270' }}>01</span>
                <h4 className="text-lg font-medium" style={{ color: '#cfb270' }}>Specifikace vozidla</h4>
              </div>
              <p className="text-white text-sm leading-relaxed">
                První konzultace proběhne u nás, nebo v případě větší vzdálenosti telefonicky.
              </p>
            </div>

            {/* Krok 2 */}
            <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-light" style={{ color: '#cfb270' }}>02</span>
                <h4 className="text-lg font-medium" style={{ color: '#cfb270' }}>Hledání vozidla</h4>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Posíláme konkrétní nabídky vozidel k osobní kontrole.
              </p>
            </div>

            {/* Krok 3 */}
            <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-light" style={{ color: '#cfb270' }}>03</span>
                <h4 className="text-lg font-medium" style={{ color: '#cfb270' }}>Odjezd do Německa</h4>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Posíláme odkazy a ceny vozidel s možností účasti klienta.
              </p>
            </div>

            {/* Krok 4 */}
            <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-light" style={{ color: '#cfb270' }}>04</span>
                <h4 className="text-lg font-medium" style={{ color: '#cfb270' }}>Prohlídka vozidla</h4>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Kompletní prohlídka a zkušební jízda s technikem.
              </p>
            </div>

            {/* Krok 5 */}
            <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-light" style={{ color: '#cfb270' }}>05</span>
                <h4 className="text-lg font-medium" style={{ color: '#cfb270' }}>Předání vozidla</h4>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Servisujeme, připravujeme a vyřizujeme vše potřebné.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="relative w-full h-[600px] z-50 bg-white">
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
      <section id="vozidla" className="py-12 lg:py-16 bg-white relative z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8">
            Aktuálně předaná vozidla našim zákazníkům
            </h2>
          
          {/* Galerie vozidel */}
          <div className="grid grid-cols-4 gap-3">
            {/* Vozidlo 1 */}
            <div onClick={() => setSelectedCar('staria')} className="group cursor-pointer">
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
              <p className="text-center text-sm font-medium mt-2 text-gray-700 group-hover:text-[#cfb270] transition">Hyundai Staria</p>
                </div>

            {/* Vozidlo 2 */}
            <div onClick={() => setSelectedCar('kodiaq')} className="group cursor-pointer">
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
              <p className="text-center text-sm font-medium mt-2 text-gray-700 group-hover:text-[#cfb270] transition">Škoda Kodiaq</p>
            </div>
            
            {/* Vozidlo 3 */}
            <div onClick={() => setSelectedCar('bmw')} className="group cursor-pointer">
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
              <p className="text-center text-sm font-medium mt-2 text-gray-700 group-hover:text-[#cfb270] transition">BMW</p>
              </div>
            
            {/* Vozidlo 4 */}
            <div onClick={() => setSelectedCar('arteon')} className="group cursor-pointer">
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
              <p className="text-center text-sm font-medium mt-2 text-gray-700 group-hover:text-[#cfb270] transition">Volkswagen Arteon</p>
              </div>
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
            <div id="formular">
              <h2 id="formular-nadpis" className="text-3xl lg:text-4xl font-light text-gray-900 mb-6">
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
          <div id="kontakt" className="mt-20 pt-16 border-t border-gray-900/20">
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

      {/* Recenze Section - Google Style */}
      <section className="bg-[#f1f1f1] py-16 lg:py-20 relative z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Co říkají naši zákazníci
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl font-normal text-gray-900">{googleRating.toFixed(1)}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-yellow-500">★</span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Na základě {totalReviews} hodnocení</p>
          </div>

          {/* Carousel s recenzemi */}
          <div className="relative">
            {/* Navigační šipky */}
            <button
              onClick={prevReview}
              className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition border-2 hover:scale-110"
              style={{ backgroundColor: '#353434', borderColor: '#cfb270' }}
              aria-label="Předchozí recenze"
            >
              <span className="text-white text-2xl font-light">‹</span>
            </button>

            <button
              onClick={nextReview}
              className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition border-2 hover:scale-110"
              style={{ backgroundColor: '#353434', borderColor: '#cfb270' }}
              aria-label="Další recenze"
            >
              <span className="text-white text-2xl font-light">›</span>
            </button>

            {/* Recenze cards */}
            <div className="overflow-hidden">
              <div 
                className="grid md:grid-cols-3 gap-4 transition-all duration-500"
                style={{ transform: `translateX(0)` }}
              >
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
                    <div key={`${currentReviewIndex}-${offset}`} className="bg-white border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        {authorPhoto ? (
                          <>
                            <img 
                              src={authorPhoto} 
                              alt={authorName}
                              className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </>
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
          </div>

          {/* Odkaz na Google */}
          <div className="text-center mt-10">
            <a 
              href="https://www.google.com/search?q=KomfortCars+Dovoz+vozidel+na+objednávku+Recenze" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:scale-105"
              style={{ backgroundColor: '#cfb270', color: '#000' }}
            >
              <Image src="/globe.svg" alt="Google" width={16} height={16} />
              Zobrazit všechny recenze na Google
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 relative z-50">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <Image
              src="/komfortcars_logo.png"
              alt="KomfortCars"
              width={200}
              height={60}
              className="h-12 w-auto mx-auto mb-6"
            />
            <p className="text-gray-400">
              © 2024 Dovoz aut z Německa | KomfortCars
            </p>
          </div>
        </div>
      </footer>

      {/* Modal pro detail vozidla */}
      {selectedCar && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedCar(null)}
        >
          <div 
            className="bg-[#353434] max-w-5xl w-full rounded-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zavírací tlačítko */}
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 text-white text-3xl font-light hover:text-[#cfb270] transition z-10"
            >
              ×
            </button>

            <div className="p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-8" style={{ color: '#cfb270' }}>
                {carsData[selectedCar as keyof typeof carsData].name}
              </h2>

              {/* Grid fotky */}
              <div className="grid grid-cols-2 gap-4 mb-8">
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
              <div className="border-l-2 pl-6" style={{ borderColor: '#cfb270' }}>
                <h3 className="text-xl font-medium mb-4" style={{ color: '#cfb270' }}>Specifikace</h3>
                <ul className="space-y-2">
                  {carsData[selectedCar as keyof typeof carsData].specs.map((spec, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-start">
                      <span className="mr-2" style={{ color: '#cfb270' }}>•</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
