import FadeIn from "./FadeIn";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export default function ContactSection() {
  const mensaje = encodeURIComponent(
    "Hola! Quiero consultar sobre el catálogo de Gozart."
  );
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;

  return (
    <section id="contacto" className="px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <p className="font-display text-charcoal text-3xl md:text-4xl mb-4 tracking-logo">
            Hablemos
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="font-sans text-graphite text-sm md:text-base mb-10">
            ¿Tenés dudas sobre una obra, un tamaño o un envío? Escribinos y te
            respondemos directo.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-charcoal text-cream px-8 py-3.5 text-sm tracking-wide rounded-md hover:bg-graphite transition-colors"
          >
            Escribir por WhatsApp
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
