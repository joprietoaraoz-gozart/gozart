"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PulseImage({
  src,
  alt,
  className = "",
  duration = 5,
  delay = 0,
  scale = 1.08,
}: {
  src: string;
  alt: string;
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
      className={`absolute bg-sand/30 shadow-sm overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="200px"
      />
    </motion.div>
  );
}
