"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "./Logo";

export default function Hero({ imagenes }: { imagenes: string[] }) {
  const tira = imagenes.length > 0 ? [...imagenes, ...imagenes] : [];

  return (
    <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-charcoal"
        >
          <Logo className="h-28 md:h-48 w-auto mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-graphite text-base md:text-lg mt-6"
        >
          obras que trascienden con el tiempo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex items-center justify-center gap-4"
        >
          <a
            href="#obras"
            className="bg-charcoal text-cream px-6 py-3 text-sm tracking-wide hover:bg-graphite transition-colors"
          >
            Ver obras
          </a>
          <a
            href="#sobre"
            className="border border-charcoal text-charcoal px-6 py-3 text-sm tracking-wide hover:bg-charcoal hover:text-cream transition-colors"
          >
            Sobre Gozart
          </a>
        </motion.div>
      </div>

      {tira.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 md:mt-24 relative"
        >
          <div className="flex gap-4 animate-marquee w-max">
            {tira.map((src, i) => (
              <div
                key={i}
                className="relative w-40 h-52 md:w-56 md:h-72 flex-shrink-0 bg-sand/30"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            ))}
          </div>
          {/* Degradados en los bordes para que la tira se "pierda" hacia los costados */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-cream to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
