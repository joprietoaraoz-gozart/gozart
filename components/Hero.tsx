"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TextReveal from "./TextReveal";

export default function Hero({ imagenes }: { imagenes: string[] }) {
  const tira = imagenes.length > 0 ? [...imagenes, ...imagenes] : [];

  return (
    <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <div className="flex justify-center overflow-hidden text-charcoal font-display font-normal tracking-[-0.1em] leading-none md:leading-[92px] text-6xl md:text-8xl">
          <motion.span
            initial={{ x: "-60%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            GOZ
          </motion.span>
          <motion.span
            initial={{ x: "60%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            ART
          </motion.span>
        </div>

        <p className="font-script text-charcoal text-2xl md:text-3xl mt-8">
          <TextReveal text="obras que trascienden con el tiempo" delay={0.5} />
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a
            href="#obras"
            className="bg-charcoal text-cream px-6 py-3 text-sm rounded-md hover:bg-graphite transition-colors"
          >
            Ver obras
          </a>
          <a
            href="#sobre"
            className="border border-charcoal px-6 py-3 text-sm rounded-md hover:bg-charcoal hover:text-cream transition-colors"
          >
            Quiénes somos
          </a>
        </motion.div>
      </div>

      {tira.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-cream to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
