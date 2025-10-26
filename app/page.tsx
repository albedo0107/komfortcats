import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 shadow-lg">
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
              <Link href="#o-nas" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                O nás
              </Link>
              <Link href="#jak-to-probiha" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                Jak to probíhá?
              </Link>
              <Link href="#proc-nas" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                Proč zvolit nás?
              </Link>
              <Link href="#vozidla" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                Dovezená vozidla
              </Link>
              <Link href="#kontakt" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                Kontakty
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* O nás Section */}
      <section id="o-nas" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
        <Image
            src="/superb.png"
            alt="Luxury Car"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                O nás
              </span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 leading-relaxed mb-6 font-light">
                Firma KomfortCars je na českém trhu s ojetými vozy již od roku 1999. 
                Při výběru a nákupu vozidel využíváme zkušeností, které jsme nabyli 
                za dobu své bohaté praxe. Prioritou je spokojenost našich zákazníků, 
                pro které jsme do dnešní doby dovezli přes 3000 vozidel.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                Následná doporučení dalším klientům jsou známkou toho, 
                že svou práci děláme spolehlivě a kvalitně.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-yellow-500/80 transition-all duration-200 hover:shadow-yellow-500/40 hover:shadow-3xl hover:scale-105 group">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200">
                <span className="text-2xl font-bold text-black">25+</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Let zkušeností</h3>
              <p className="text-gray-400">Na trhu od roku 1999</p>
            </div>
            <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-yellow-500/80 transition-all duration-200 hover:shadow-yellow-500/40 hover:shadow-3xl hover:scale-105 group">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200">
                <span className="text-2xl font-bold text-black">3000+</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Spokojených zákazníků</h3>
              <p className="text-gray-400">Dovezených vozidel</p>
            </div>
            <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-yellow-500/80 transition-all duration-200 hover:shadow-yellow-500/40 hover:shadow-3xl hover:scale-105 group">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200">
                <span className="text-2xl font-bold text-black">100%</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Důvěra</h3>
              <p className="text-gray-400">Osobní prověření vozidel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vozidla Section */}
      <section id="vozidla" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Aktuálně předaná vozidla
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">Naši zákazníci si převzali tato luxusní vozidla</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/vozidla/subaru-forester" className="block bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 hover:border-yellow-500/80 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group">
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
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors">Subaru Forester</h3>
                <p className="text-gray-400 mb-4">2.0 i / 2017 / 26 000 km / 110kW</p>
                <div className="inline-flex items-center text-yellow-500 group-hover:text-yellow-400 font-bold group-hover:translate-x-2 transition-all duration-300">
                  Zobrazit vozidlo →
                </div>
              </div>
            </Link>
            
            <Link href="/vozidla/hyundai-staria" className="block bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 hover:border-yellow-500/80 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group">
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
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors">Hyundai Staria</h3>
                <p className="text-gray-400 mb-4">31. 3. 2025</p>
                <div className="inline-flex items-center text-yellow-500 group-hover:text-yellow-400 font-bold group-hover:translate-x-2 transition-all duration-300">
                  Zobrazit vozidlo →
                </div>
              </div>
            </Link>
            
            <Link href="/vozidla/vw-arteon" className="block bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 hover:border-yellow-500/80 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group">
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
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors">Volkswagen Arteon R-line</h3>
                <p className="text-gray-400 mb-4">18. 2. 2025</p>
                <div className="inline-flex items-center text-yellow-500 group-hover:text-yellow-400 font-bold group-hover:translate-x-2 transition-all duration-300">
                  Zobrazit vozidlo →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Jak to probíhá Section */}
      <section id="jak-to-probiha" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/komfortcars_title.png"
            alt="KomfortCars Title"
            fill
            className="object-contain scale-75"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Jak to u nás probíhá?
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">Profesionální proces dovozu vozidel krok za krokem</p>
          </div>
          
          <div className="relative">
            {/* Spojovací čára pro desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500/30 via-yellow-500 to-yellow-500/30 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-5 gap-8 relative z-10">
              <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 hover:border-yellow-500/80 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group relative">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200 relative z-10">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Specifikace vozidla</h3>
                <p className="text-gray-400 leading-relaxed">Preferujeme osobní setkání, kde si vysvětlíme postup při dovozu vozidla.</p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 hover:border-yellow-500/80 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group relative">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200 relative z-10">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Hledání vozidla</h3>
                <p className="text-gray-400 leading-relaxed">Pošleme konkrétní nabídky vozidel, která pojedeme osobně prověřit.</p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 hover:border-yellow-500/80 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group relative">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200 relative z-10">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Odjezd do Německa</h3>
                <p className="text-gray-400 leading-relaxed">Posíláme aktuální odkazy na vozidla, která splňují požadavky.</p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 hover:border-yellow-500/80 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group relative">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200 relative z-10">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Prohlídka a nákup</h3>
                <p className="text-gray-400 leading-relaxed">Po kompletní prohlídce a zkušební jízdě vozidlo doporučíme nebo hledáme další.</p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 hover:border-yellow-500/80 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group relative">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200 relative z-10">
                  5
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Předání vozidla</h3>
                <p className="text-gray-400 leading-relaxed">Servisujeme a připravujeme k předání včetně veškeré administrativy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden py-12 flex items-center">
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mb-8">
              <Image
                src="/komfortcars_title.png"
                alt="KomfortCars"
                width={600}
                height={200}
                className="mx-auto h-20 w-auto drop-shadow-2xl"
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Dovoz vozidel z Německa a Švédska
              </span>
          </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 font-light">
              Na trhu od 1999 | Více než 3000 spokojených zákazníků
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#kontakt"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-3 rounded-full font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105"
              >
                Chci dovézt auto
              </Link>
              <Link 
                href="#vozidla"
                className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 backdrop-blur-sm"
              >
                Prohlédnout vozidla
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proč zvolit nás Section */}
      <section id="proc-nas" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Proč zvolit nás?
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">Naše výhody pro luxusní dovoz vozidel</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border-l-4 border-yellow-500 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center mr-4 shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200">
                  <span className="text-white font-bold text-lg">★</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-500">Zkušenosti</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">Při výběru vozidel využíváme dlouholeté znalosti a zkušenosti s německým automobilovým trhem.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border-l-4 border-yellow-500 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center mr-4 shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-500">100% Důvěra</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">Dovážíme jen taková vozidla, o kterých jsme přesvědčeni, že splňují požadované parametry.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border-l-4 border-yellow-500 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center mr-4 shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200">
                  <span className="text-white font-bold text-lg">🔍</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-500">Původ automobilu</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">U všech vozidel prověřujeme stav najetých kilometrů a historii vozidla.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border-l-4 border-yellow-500 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center mr-4 shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200">
                  <span className="text-white font-bold text-lg">👑</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-500">Váš komfort</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">Zařizujeme i služby související s dovozem - transport, STK + ME, servis, přidělení SPZ.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border-l-4 border-yellow-500 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center mr-4 shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-500">Naše standardy</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">Pokud vozidlo nevyhovuje našemu standardu, AUTO NEKUPUJEME a pokračujeme v hledání.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border-l-4 border-yellow-500 hover:shadow-yellow-500/40 hover:shadow-3xl transition-all duration-200 hover:scale-105 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center mr-4 shadow-2xl group-hover:scale-125 group-hover:shadow-yellow-500/50 transition-all duration-200">
                  <span className="text-white font-bold text-lg">🛠️</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-500">Doplňkové služby</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">Zajišťujeme pojištění, servis, STK + ME, odtahy vozidel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="pt-8 pb-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Kontakt
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">Spojte se s našimi odborníky na luxusní dovoz vozidel</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="pl-4">
              <h3 className="text-2xl font-bold mb-8 text-white">Náš tým</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-500 pl-4 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl shadow-2xl hover:shadow-yellow-500/20 hover:shadow-3xl transition-all duration-500">
                  <div className="flex items-center mb-3">
                    <Image
                      src="/Josef_Bystrican.png"
                      alt="Josef Bystřičan"
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <h4 className="text-lg font-bold text-white">Josef Bystřičan</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Tel.: +420 608 808 285</p>
                  <p className="text-gray-400 text-sm">E-mail: info@komfortcars.cz</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl shadow-2xl hover:shadow-yellow-500/20 hover:shadow-3xl transition-all duration-500">
                  <div className="flex items-center mb-3">
                    <Image
                      src="/Josef_Bystrican_ml.png"
                      alt="Josef Bystřičan ml."
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <h4 className="text-lg font-bold text-white">Josef Bystřičan ml.</h4>
                  </div>
                  <p className="text-gray-400 text-sm">Tel.: +420 608 200 021</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl shadow-2xl hover:shadow-yellow-500/20 hover:shadow-3xl transition-all duration-500">
                  <div className="flex items-center mb-3">
                    <Image
                      src="/Sarka_Bystricanova.png"
                      alt="Mgr. Šárka Bystřičanová"
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <h4 className="text-lg font-bold text-white">Mgr. Šárka Bystřičanová</h4>
                  </div>
                  <p className="text-gray-400 text-sm">Tel.: +420 774 353 529</p>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl shadow-2xl">
                <h4 className="text-lg font-bold mb-3 text-white">Provozovna</h4>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm font-semibold">KOMFORTCARS</p>
                  <p className="text-gray-400 text-sm">Ostravská 494</p>
                  <p className="text-gray-400 text-sm">Sviadnov 739 25</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-8 text-white">Mám zájem o dovoz auta</h3>
              <form className="flex-1 space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl shadow-2xl">
                <div>
                  <label htmlFor="jmeno" className="block text-sm font-bold text-white mb-2">
                    Jméno a příjmení *
                  </label>
                  <input
                    type="text"
                    id="jmeno"
                    name="jmeno"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-white transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="telefon" className="block text-sm font-bold text-white mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-white transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-white transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="typ-auta" className="block text-sm font-bold text-white mb-2">
                    Typ automobilu *
                  </label>
                  <textarea
                    id="typ-auta"
                    name="typ-auta"
                    rows={3}
                    required
                    className="w-full px-3 py-2 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-700 text-white transition-all duration-300"
                    placeholder="Popište požadavky na vozidlo..."
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="souhlas"
                    name="souhlas"
                    required
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="souhlas" className="ml-2 block text-sm text-gray-300">
                    Souhlasím se všeobecnými obchodními podmínkami *
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-2 px-4 rounded-lg font-bold text-sm hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105"
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

