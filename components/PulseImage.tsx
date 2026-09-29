"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PulseImage({
  src,
  alt,
  ratio,
  width,
  className = "",
  duration = 5,
  delay = 0,
  scale = 1.08,
}: {
  src: string;
  alt: string;
  ratio: string; // ej. "855/900" (ancho/alto real de la foto)
  width: string; // ej. "clamp(70px, 9vw, 120px)"
  className?: string;
  duration?: number;
  delay?: number;
  scale?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: [1, scale, 1] }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: {
          duration,
          delay,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
      }}
      style={{ width, aspectRatio: ratio }}
      className={`absolute bg-sand/30 shadow-sm overflow-hidden rounded-sm ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="200px" />
    </motion.div>
  );
}
