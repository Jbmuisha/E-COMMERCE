import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "E-Commerce Parfum",
  description: "Vente de parfums exclusifs en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Navbar */}
        <nav className="bg-white shadow p-4 flex justify-between items-center ">
          <div className="font-bold text-xl">Lgo</div>
          <div className="flex gap-4 items-center gap-20" >
            <Link href="/">Accueil</Link>
            <Link href="/products">Produits</Link>
            <Link href="/contact">Contact</Link>
            <button>🛒</button>
            <button>👤</button>
            <select className="border rounded px-1 py-0.5">
              <option>FR</option>
              <option>EN</option>
            </select>
            <input
              type="text"
              placeholder="Rechercher..."
              className="border rounded px-2 py-1"
            />
          </div>
        </nav>

        {/* Contenu principal */}
        <main className="p-4">{children}</main>

        {/* Footer */}
        <footer className="bg-white shadow mt-8 p-4 text-center">
          &copy; 2025 E-Commerce Parfum. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
