import FadeIn from "./FadeIn";
import TextReveal from "./TextReveal";

export default function AboutSection() {
  return (
    <section id="sobre" className="px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="font-display text-charcoal text-3xl md:text-4xl mb-6 tracking-logo">
            Sobre Gozart
          </p>
        </FadeIn>

        <p className="font-sans text-charcoal text-lg md:text-2xl leading-relaxed">
          <TextReveal text="Curamos y enmarcamos reproducciones de obras de expresionismo alemán y primera abstracción — piezas de principios del siglo XX que siguen diciendo algo hoy." />
        </p>

        <FadeIn delay={0.2}>
          <p className="font-sans text-graphite text-sm md:text-base leading-relaxed mt-6 max-w-2xl mx-auto">
            Cada obra del catálogo pasa por una curaduría propia: revisamos
            procedencia, época y composición antes de sumarla. El resultado es
            una colección pensada para acompañar espacios con carácter, no
            solo para llenar una pared.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
