import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { CurrencyProvider } from "./context/CurrencyProvider";

export const metadata: Metadata = {
  title: "Ecommerce Gorazer",
  description: "Frontend en Next.js para el ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}

