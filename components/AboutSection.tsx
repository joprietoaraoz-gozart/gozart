import FadeIn from "./FadeIn";
import TextReveal from "./TextReveal";

export default function AboutSection() {
  return (
    <section id="sobre" className="px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="font-display text-3xl md:text-4xl mb-6 tracking-logo">
            Quiénes somos
          </p>
        </FadeIn>

        <p className="font-sans text-charcoal text-lg md:text-2xl leading-relaxed">
          <TextReveal text="Gozart nace para acercar el arte a la vida cotidiana, como parte de quiénes somos." />
        </p>

        <FadeIn delay={0.15}>
          <p className="font-sans text-graphite text-sm md:text-base leading-relaxed mt-6 max-w-2xl mx-auto">
            Creemos que un hogar se construye con pequeñas elecciones que
            hablan de nosotros: una obra que nos recuerda un viaje, un libro
            que nos inspira, un objeto que nos genera calma o una pieza que
            nos detiene unos segundos en medio de la rutina.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="font-sans text-graphite text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            Buscamos ayudar a cada persona a encontrar piezas que reflejen su
            identidad y su forma de habitar.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
