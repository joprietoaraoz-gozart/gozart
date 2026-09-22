import Link from "next/link";
import type { Obra } from "@/lib/supabase";
import ObraCard from "./ObraCard";
import FadeIn from "./FadeIn";

export default function FeaturedWorks({ obras }: { obras: Obra[] }) {
  return (
    <section id="obras" className="px-6 md:px-12 py-20 md:py-28 bg-sand/10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-14">
          <p className="font-display text-charcoal text-3xl md:text-4xl mb-2 tracking-logo">
            Obras destacadas
          </p>
        </FadeIn>

        {obras.length === 0 ? (
          <p className="text-center text-stone text-sm">
            Todavía no hay obras cargadas.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-14">
            {obras.map((obra, i) => (
              <FadeIn key={obra.id} delay={Math.min(i * 0.08, 0.4)}>
                <ObraCard obra={obra} />
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn className="text-center">
          <Link
            href="/catalogo"
            className="inline-block border border-charcoal text-charcoal px-7 py-3 text-sm tracking-wide rounded-md hover:bg-charcoal hover:text-cream transition-colors"
          >
            Ver catálogo completo
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
