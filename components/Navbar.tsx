"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "#sobre", label: "Sobre Gozart" },
  { href: "#obras", label: "Obras" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-sm border-b border-sand/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="font-display text-charcoal text-xl md:text-2xl tracking-logo"
        >
          gozart
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-graphite">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={isHome ? l.href : `/${l.href}`}
              className="relative group py-1"
            >
              {l.label}
              <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-charcoal transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Link
            href="/catalogo"
            className="border border-charcoal px-4 py-2 text-xs tracking-wide text-charcoal hover:bg-charcoal hover:text-cream transition-colors"
          >
            Ver catálogo
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-charcoal text-sm"
          aria-label="Menú"
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-sand/60 px-6 py-6 flex flex-col gap-4 text-sm text-graphite">
          {LINKS.map((l) => (
            <a key={l.href} href={isHome ? l.href : `/${l.href}`} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link href="/catalogo" onClick={() => setOpen(false)} className="text-charcoal">
            Ver catálogo
          </Link>
        </div>
      )}
    </header>
  );
}
