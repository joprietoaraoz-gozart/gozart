"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TextReveal from "./TextReveal";
import PulseImage from "./PulseImage";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Imágenes desparramadas alrededor del logo */}
      <div className="relative h-[360px] md:h-[440px] max-w-5xl mx-auto px-4">
        <PulseImage
          src="/hero/obra-1.jpg"
          alt="Obra del catálogo Gozart"
          className="left-[6%] top-[38%] w-20 h-28 md:left-[10%] md:top-[32%] md:w-28 md:h-36 rounded-sm"
          duration={5.5}
          delay={0.2}
        />
        <PulseImage
          src="/hero/obra-2.jpg"
          alt="Obra del catálogo Gozart"
          className="left-[20%] top-[4%] w-24 h-20 md:left-[24%] md:top-[2%] md:w-32 md:h-24 rounded-sm"
          duration={6.2}
          delay={0.5}
        />
        <PulseImage
          src="/hero/obra-3.jpg"
          alt="Obra del catálogo Gozart"
          className="left-[2%] top-[2%] w-16 h-16 md:left-[4%] md:top-[0%] md:w-20 md:h-20 rounded-sm"
          duration={4.8}
          delay={0.1}
        />
        <PulseImage
          src="/hero/obra-4.jpg"
          alt="Obra del catálogo Gozart"
          className="right-[38%] top-[0%] w-28 h-32 md:right-[40%] md:top-[0%] md:w-36 md:h-44 rounded-sm z-10"
          duration={5}
          delay={0.35}
        />
        <PulseImage
          src="/hero/obra-5.jpg"
          alt="Obra del catálogo Gozart"
          className="right-[16%] top-[10%] w-20 h-16 md:right-[20%] md:top-[6%] md:w-28 md:h-20 rounded-sm"
          duration={6.8}
          delay={0.6}
        />
        <PulseImage
          src="/hero/obra-6.jpg"
          alt="Obra del catálogo Gozart"
          className="right-[2%] top-[42%] w-24 h-24 md:right-[6%] md:top-[36%] md:w-32 md:h-32 rounded-sm"
          duration={5.8}
          delay={0.45}
        />

        {/* Logo + tagline + botones, centrados debajo de la tira de imágenes */}
        <div className="absolute inset-x-0 bottom-0 text-center px-4">
          <div className="flex justify-center items-end gap-3 md:gap-4">
            <motion.div
              initial={{ x: "-70%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-20 h-10 md:w-28 md:h-14"
            >
              <Image
                src="/logo-parts/goz.svg"
                alt="Goz"
                fill
                className="object-contain object-right"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ x: "70%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[72px] h-9 md:w-24 md:h-12"
            >
              <Image
                src="/logo-parts/art.svg"
                alt="Art"
                fill
                className="object-contain object-left"
                priority
              />
            </motion.div>
          </div>

          <p className="font-script text-charcoal text-xl md:text-3xl mt-4">
            <TextReveal text="obras que trascienden con el tiempo" delay={0.5} />
          </p>
        </div>
      </div>

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
    </section>
  );
}
