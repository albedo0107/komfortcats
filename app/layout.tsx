import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dovoz vozidel Ostrava, Frýdek-Místek, Karviná | Komfort Cars - Dovoz aut z Německa",
  description: "Dovoz vozidel Ostrava a Moravskoslezský kraj. Profesionální dovoz aut z Německa na objednávku. Frýdek-Místek, Karviná, Havířov, Opava. Zkušenosti od roku 1999, přes 3000 spokojených zákazníků. Dovážíme i do Prahy a Brna.",
  keywords: "dovoz vozidel, dovoz aut z Německa, dovoz vozidel Ostrava, dovoz vozidel Frýdek-Místek, dovoz vozidel Karviná, dovoz aut Moravskoslezský kraj, dovoz vozidel Praha, dovoz vozidel Brno, import aut z Německa, Komfort Cars",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  icons: {
    icon: '/komfortcars_icon.png',
    shortcut: '/komfortcars_icon.png',
    apple: '/komfortcars_icon.png',
  },
  openGraph: {
    title: "Dovoz vozidel Ostrava, Frýdek-Místek, Karviná | Komfort Cars",
    description: "Dovoz vozidel Ostrava a Moravskoslezský kraj. Profesionální dovoz aut z Německa na objednávku. Frýdek-Místek, Karviná, Havířov, Opava.",
    type: "website",
    locale: "cs_CZ",
    siteName: "Komfort Cars",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://komfortcars.cz",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Komfort Cars",
  "description": "Profesionální dovoz vozidel z Německa na objednávku. Působíme v Ostravě, Frýdku-Místku, Karviné a celém Moravskoslezském kraji.",
  "url": "https://komfortcars.cz",
  "telephone": "+420 608 808 285",
  "email": "info@komfortcars.cz",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Frýdek-Místek",
    "addressLocality": "Frýdek-Místek",
    "addressRegion": "Moravskoslezský kraj",
    "addressCountry": "CZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "49.6833",
    "longitude": "18.3500"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Frýdek-Místek"
    },
    {
      "@type": "City",
      "name": "Ostrava"
    },
    {
      "@type": "City",
      "name": "Karviná"
    },
    {
      "@type": "City",
      "name": "Havířov"
    },
    {
      "@type": "City",
      "name": "Opava"
    },
    {
      "@type": "City",
      "name": "Třinec"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Moravskoslezský kraj"
    },
    {
      "@type": "City",
      "name": "Praha"
    },
    {
      "@type": "City",
      "name": "Brno"
    },
    {
      "@type": "City",
      "name": "Olomouc"
    }
  ],
  "priceRange": "$$",
  "openingHours": "Mo-Fr 08:00-17:00",
  "sameAs": [
    "https://www.instagram.com/komfortcars"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "100"
  },
  "serviceType": [
    "Dovoz vozidel z Německa",
    "Dovoz prémiových vozidel",
    "Import automobilů",
    "Dovoz elektromobilů"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
