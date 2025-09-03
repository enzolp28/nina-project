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
  title: "Too Many Balloons - Décorations en ballons pour tous vos événements'",
  description: "Too Many Balloons réalise des décorations en ballons uniques pour anniversaires, fêtes, événements d'entreprise et plus encore. Donnez une touche magique et festive à vos événements grâce à nos arches, colonnes et créations sur-mesure !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
