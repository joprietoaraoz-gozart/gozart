import FadeIn from "./FadeIn";

export default function AboutSection() {
  return (
    <section id="sobre" className="px-6 md:px-12 pt-24 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="font-display text-3xl md:text-4xl mb-6 tracking-logo">
            Arte para habitar
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="font-sans text-graphite text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Gozart nace para acercar el arte a la vida cotidiana, como parte de
            quiénes somos.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="font-sans text-graphite text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
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
