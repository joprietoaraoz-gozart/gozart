"use client";

import { motion } from "framer-motion";

// Muestra un texto palabra por palabra cuando entra en pantalla.
// El "disparador" (whileInView) va en el contenedor y no en cada palabra:
// cada palabra arranca escondida dentro de un recorte (overflow-hidden), y si el
// disparador estuviera en la palabra el navegador nunca la "ve" y no aparece nunca.
export default function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              oculto: { y: "110%" },
              visible: {
                y: 0,
                transition: { duration: 0.6, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
