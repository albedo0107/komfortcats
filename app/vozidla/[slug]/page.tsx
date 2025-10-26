import Image from "next/image";
import Link from "next/link";

interface VehiclePageProps {
  params: {
    slug: string;
  };
}

// Mock data pro vozidla
const vehicles = {
  "subaru-forester": {
    title: "Subaru Forester",
    year: "2017",
    mileage: "26 000 km",
    power: "110kW",
    price: "1 250 000 Kč",
    images: ["/1-24.png"],
    description: "Luxusní SUV s výkonným motorem a prémiovým vybavením. Ideální pro rodiny i outdoorové aktivity.",
    specifications: {
      "Motor": "2.0 i",
      "Rok výroby": "2017",
      "Najeto": "26 000 km",
      "Výkon": "110kW",
      "Pohon": "4WD",
      "Převodovka": "Automatická"
    },
    equipment: [
      "Klimatizace",
      "Elektrická okna",
      "Centrální zamykání",
      "ABS",
      "Airbagy",
      "Rádio/CD",
      "Naučný systém",
      "Kožené sedadla"
    ]
  },
  "hyundai-staria": {
    title: "Hyundai Staria",
    year: "2025",
    mileage: "Nové",
    power: "Víceúčelové",
    price: "Na dotaz",
    images: ["/1-17.png"],
    description: "Moderní víceúčelové vozidlo s prostorným interiérem a nejnovějšími technologiemi.",
    specifications: {
      "Typ": "Víceúčelové vozidlo",
      "Rok": "2025",
      "Stav": "Nové",
      "Kapacita": "8+1 míst",
      "Pohon": "Přední náprava"
    },
    equipment: [
      "Moderní design",
      "Prostorný interiér",
      "Klimatizace",
      "Elektrické ovládání",
      "Bezpečnostní systémy",
      "Multimediální systém"
    ]
  },
  "vw-arteon": {
    title: "Volkswagen Arteon R-line",
    year: "2025",
    mileage: "Nové",
    power: "Výkonný",
    price: "Na dotaz",
    images: ["/arteon2.jpg"],
    description: "Elegantní sedan s dynamickým designem a prémiovým vybavením. Perfektní kombinace stylu a výkonu.",
    specifications: {
      "Model": "Arteon R-line",
      "Rok": "2025",
      "Stav": "Nové",
      "Design": "R-line",
      "Kategorie": "Luxusní sedan"
    },
    equipment: [
      "R-line design",
      "Sportovní vzhled",
      "Prémiové materiály",
      "Moderní technologie",
      "Bezpečnostní systémy",
      "Klimatizace",
      "Multimediální systém"
    ]
  }
};

export default function VehiclePage({ params }: VehiclePageProps) {
  const vehicle = vehicles[params.slug as keyof typeof vehicles];

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Vozidlo nenalezeno</h1>
            <p className="text-gray-400 mb-8">Požadované vozidlo nebylo nalezeno.</p>
            <Link 
              href="/" 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-3 rounded-full font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
            >
              Zpět na hlavní stránku
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/komfortcars_logo.png"
                alt="KomfortCars"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/#o-nas" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                O nás
              </Link>
              <Link href="/#jak-to-probiha" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                Jak to probíhá?
              </Link>
              <Link href="/#proc-nas" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                Proč zvolit nás?
              </Link>
              <Link href="/#vozidla" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                Dovezená vozidla
              </Link>
              <Link href="/#kontakt" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                Kontakty
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
              Domů
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/#vozidla" className="text-gray-400 hover:text-yellow-400 transition-colors">
              Vozidla
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-yellow-400">{vehicle.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src={vehicle.images[0]}
                alt={vehicle.title}
                width={800}
                height={600}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{vehicle.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{vehicle.description}</p>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-yellow-400">{vehicle.price}</p>
                    <p className="text-gray-400">Cena</p>
                  </div>
                  <Link 
                    href="/#kontakt"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-3 rounded-full font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105"
                  >
                    Chci dovézt podobné
                  </Link>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Specifikace</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(vehicle.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-700 pb-2">
                    <dt className="text-gray-400 text-sm">{key}</dt>
                    <dd className="text-white font-semibold">{value}</dd>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Vybavení</h3>
              <div className="grid grid-cols-2 gap-3">
                {vehicle.equipment.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Image
              src="/komfortcars_logo.png"
              alt="KomfortCars"
              width={200}
              height={60}
              className="h-12 w-auto mx-auto mb-6"
            />
            <p className="text-gray-400 mb-4">
              Dovoz vozidel z Německa a Švédska | Na trhu od 1999
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 KomfortCars. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}