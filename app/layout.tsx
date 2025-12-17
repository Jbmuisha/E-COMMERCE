import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
      <head>
     
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >

    
       
       <div className="navbar">
        <div className="logo">
          
        </div>
        <nav className="nav_list">
          <div className="Link_list">
            <Link href='/Acceuil'>Home</Link>
            <Link href='/product'>Product</Link>
             <Link href='/about_us'>About_us</Link>
             <Link href='/contact_us'>Contact_us</Link>
          
          <div className="icon">
            <div className="IconIput">
             <FontAwesomeIcon icon={faUser} 
             style={{ width: '20px' }} />
            </div>
            <div className="langageOptions">
            <select name="" id="">
              <option value="fr">FR</option>
              <option value="EN">EN</option>
              
            </select>
            </div>
            <div className="searchInput">
            <input type="text"placeholder="searching..." />
            </div>

          </div>
          </div>

        </nav>

       </div>

      
        <main className="p-4">{children}</main>

       
        <footer className="bg-white shadow mt-8 p-4 text-center">
          &copy; 2025 E-Commerce Parfum. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
