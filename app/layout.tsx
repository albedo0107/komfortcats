import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KomfortCars - Dovoz vozidel z Německa a Švédska",
  description: "Dovoz kvalitních vozidel z Německa a Švédska. Na trhu od 1999, přes 3000 spokojených zákazníků. Osobní prověření vozidel, kompletní servis.",
  icons: {
    icon: "/komfortcars_icon.png",
    shortcut: "/komfortcars_icon.png",
    apple: "/komfortcars_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
