"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VWArteonPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const vehicle = {
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
  };

  const allImages = [
    vehicle.images[0],
    "/1-12.jpg",
    "/3-12.jpg", 
    "/4-12.jpg"
  ];

  const openModal = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(allImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(allImages[prevIndex]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#242426] via-[#3a3a3c] to-[#6a6a6c]"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#242426]/20 to-[#ffffff]/10"></div>
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                     radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%),
                     radial-gradient(circle at 40% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)`
      }}></div>
      
      {/* Header */}
      <header className="relative z-50 shadow-lg" style={{ backgroundColor: '#343534' }}>
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
              <Link href="/#o-nas" className="text-gray-300 hover:text-[#c1ac68] font-medium transition-colors">
                O nás
              </Link>
              <Link href="/#jak-to-probiha" className="text-gray-300 hover:text-[#c1ac68] font-medium transition-colors">
                Jak to probíhá?
              </Link>
              <Link href="/#proc-nas" className="text-gray-300 hover:text-[#c1ac68] font-medium transition-colors">
                Proč zvolit nás?
              </Link>
              <Link href="/#vozidla" className="text-gray-300 hover:text-[#c1ac68] font-medium transition-colors">
                Dovezená vozidla
              </Link>
              <Link href="/#kontakt" className="text-gray-300 hover:text-[#c1ac68] font-medium transition-colors">
                Kontakty
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="relative z-30 py-4" style={{ backgroundColor: '#434242' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-[#c1ac68] transition-colors">
              Domů
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/#vozidla" className="text-gray-400 hover:text-[#c1ac68] transition-colors">
              Vozidla
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-[#c1ac68]">{vehicle.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 cursor-pointer" onClick={() => openModal(vehicle.images[0], 0)}>
              <Image
                src={vehicle.images[0]}
                alt={vehicle.title}
                width={800}
                height={600}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
            </div>
            
            {/* Gallery */}
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-w-16 aspect-h-9 cursor-pointer" onClick={() => openModal("/1-12.jpg", 1)}>
                <Image
                  src="/1-12.jpg"
                  alt="Gallery image 1"
                  width={400}
                  height={300}
                  className="w-full h-32 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <div className="aspect-w-16 aspect-h-9 cursor-pointer" onClick={() => openModal("/3-12.jpg", 2)}>
                <Image
                  src="/3-12.jpg"
                  alt="Gallery image 2"
                  width={400}
                  height={300}
                  className="w-full h-32 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <div className="aspect-w-16 aspect-h-9 cursor-pointer" onClick={() => openModal("/4-12.jpg", 3)}>
                <Image
                  src="/4-12.jpg"
                  alt="Gallery image 3"
                  width={400}
                  height={300}
                  className="w-full h-32 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{vehicle.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{vehicle.description}</p>
              
              <div className="bg-[#434242] p-6 rounded-2xl shadow-2xl border border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-[#c1ac68]">{vehicle.price}</p>
                    <p className="text-gray-400">Cena</p>
                  </div>
                  <Link 
                    href="/#kontakt"
                    className="bg-gradient-to-r from-[#c1ac68] to-[#a8955a] text-black px-8 py-3 rounded-full font-bold text-lg hover:from-[#c1ac68] hover:to-[#a8955a] transition-all duration-300 shadow-2xl hover:shadow-[#c1ac68]/25 transform hover:scale-105"
                  >
                    Chci dovézt podobné
                  </Link>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-[#434242] p-6 rounded-2xl shadow-2xl border border-gray-700">
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
            <div className="bg-[#434242] p-6 rounded-2xl shadow-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Vybavení</h3>
              <div className="grid grid-cols-2 gap-3">
                {vehicle.equipment.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#c1ac68] rounded-full mr-3"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-30 text-white py-12" style={{ background: 'linear-gradient(to bottom, #000000, #262527, #000000)' }}>
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

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-[#c1ac68] transition-colors z-10"
            >
              ×
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold hover:text-[#c1ac68] transition-colors z-10"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold hover:text-[#c1ac68] transition-colors z-10"
            >
              ›
            </button>
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
