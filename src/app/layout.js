import { Geist, Geist_Mono } from "next/font/google";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nina Créations - Décoration événementielle en ballons | Île-de-France",
  description: "Je conçois des décors en ballons sur mesure en Île-de-France pour sublimer vos événements : anniversaire, réception, Noël, entreprise. Une ambiance élégante, chaleureuse et mémorable.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
