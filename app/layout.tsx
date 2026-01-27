"use client";
import { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/context/Cart";
import { TranslationProvider } from "@/context/Translation";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TranslationProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
