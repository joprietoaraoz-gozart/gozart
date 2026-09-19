import type { Metadata } from "next";
import { Poller_One, Pinyon_Script, Arimo } from "next/font/google";
import "./globals.css";

const poller = Poller_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poller",
  display: "swap",
});

const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gozart — obras que trascienden con el tiempo",
  description:
    "Catálogo de reproducciones de arte curadas y enmarcadas — expresionismo alemán y primera abstracción.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${poller.variable} ${pinyon.variable} ${arimo.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
