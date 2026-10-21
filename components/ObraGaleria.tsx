"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Galería de la ficha de obra: foto grande + miniaturas debajo.
// Click en la foto grande abre el zoom oscuro (con flechas si hay varias).
export default function ObraGaleria({
  fotos,
  alt,
}: {
  fotos: string[];
  alt: string;
}) {
  const [actual, setActual] = useState(0);
  const [open, setOpen] = useState(false);

  const mover = useCallback(
    (dir: -1 | 1) => setActual((i) => (i + dir + fotos.length) % fotos.length),
    [fotos.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, mover]);

  if (fotos.length === 0) {
    return <div className="aspect-[4/5] w-full bg-sand/20 rounded-md" />;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative aspect-[4/5] w-full bg-sand/20 overflow-hidden rounded-md cursor-zoom-in block"
        aria-label="Ampliar imagen"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={fotos[actual]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={fotos[actual]}
              alt={alt}
              fill
              priority
              className="object-contain p-6 md:p-10"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
      </button>

      {fotos.length > 1 && (
        <div className="flex gap-3 mt-4 flex-wrap">
          {fotos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActual(i)}
              className={`relative w-16 h-16 md:w-20 md:h-20 bg-sand/20 overflow-hidden rounded-md border transition-colors ${
                i === actual ? "border-charcoal" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`Ver foto ${i + 1}`}
            >
              <Image src={src} alt="" fill className="object-contain p-1.5" sizes="80px" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-charcoal/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 md:top-8 md:right-8 text-cream text-sm border border-cream/40 px-3 py-1.5 rounded-md hover:bg-cream hover:text-charcoal transition-colors z-10"
              aria-label="Cerrar"
            >
              Cerrar ✕
            </button>

            {fotos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); mover(-1); }}
                  className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-cream text-2xl border border-cream/40 w-10 h-10 rounded-md hover:bg-cream hover:text-charcoal transition-colors z-10"
                  aria-label="Foto anterior"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); mover(1); }}
                  className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-cream text-2xl border border-cream/40 w-10 h-10 rounded-md hover:bg-cream hover:text-charcoal transition-colors z-10"
                  aria-label="Foto siguiente"
                >
                  ›
                </button>
              </>
            )}

            <div
              className="relative w-full h-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={fotos[actual]}
                alt={alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
