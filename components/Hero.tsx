"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import PulseImage from "./PulseImage";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Imágenes desparramadas — mismo ancho/márgenes que "Obras destacadas" */}
      <div className="px-6 md:px-12">
        <div className="relative max-w-7xl mx-auto h-[360px] md:h-[440px]">
          <PulseImage
            src="/hero/obra-1.jpg"
            alt="Obra del catálogo Gozart"
            ratio="855/900"
            width="clamp(72px, 8vw, 112px)"
            className="left-[4%] top-[36%] md:left-[8%] md:top-[30%]"
            duration={5.5}
            delay={0.2}
          />
          <PulseImage
            src="/hero/obra-2.jpg"
            alt="Obra del catálogo Gozart"
            ratio="900/756"
            width="clamp(88px, 10vw, 132px)"
            className="left-[18%] top-[2%] md:left-[22%] md:top-[0%]"
            duration={6.2}
            delay={0.5}
          />
          <PulseImage
            src="/hero/obra-3.jpg"
            alt="Obra del catálogo Gozart"
            ratio="900/659"
            width="clamp(76px, 8.5vw, 118px)"
            className="left-[0%] top-[0%] md:left-[1%] md:top-[0%]"
            duration={4.8}
            delay={0.1}
          />
          <PulseImage
            src="/hero/obra-4.jpg"
            alt="Obra del catálogo Gozart"
            ratio="900/630"
            width="clamp(110px, 12vw, 168px)"
            className="right-[36%] top-[0%] md:right-[38%] md:top-[0%] z-10"
            duration={5}
            delay={0.35}
          />
          <PulseImage
            src="/hero/obra-5.jpg"
            alt="Obra del catálogo Gozart"
            ratio="722/900"
            width="clamp(66px, 7.5vw, 104px)"
            className="right-[16%] top-[8%] md:right-[19%] md:top-[4%]"
            duration={6.8}
            delay={0.6}
          />
          <PulseImage
            src="/hero/obra-6.jpg"
            alt="Obra del catálogo Gozart"
            ratio="687/900"
            width="clamp(82px, 9vw, 128px)"
            className="right-[0%] top-[40%] md:right-[2%] md:top-[34%]"
            duration={5.8}
            delay={0.45}
          />

          {/* Logo + tagline + botones, centrados debajo de la tira de imágenes */}
          <div className="absolute inset-x-0 bottom-0 text-center">
            <div
              className="relative mx-auto text-charcoal"
              style={{
                width: "clamp(147px, 17vw, 231px)",
                aspectRatio: "373/290",
              }}
            >
              {/* "goz" (mitad de arriba del logo) entrando desde la izquierda */}
              <motion.div
                initial={{ x: "-120%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ clipPath: "inset(0 0 45% 0)" }}
              >
                <Logo className="w-full h-full" />
              </motion.div>
              {/* "art" (mitad de abajo del logo) entrando desde la derecha */}
              <motion.div
                initial={{ x: "120%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ clipPath: "inset(55% 0 0 0)" }}
              >
                <Logo className="w-full h-full" />
              </motion.div>
            </div>

            <p className="font-script text-charcoal text-xl md:text-3xl mt-4">
              <TextReveal text="obras que trascienden con el tiempo" delay={0.5} />
            </p>
          </div>
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
