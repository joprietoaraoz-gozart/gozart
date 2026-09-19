import { supabasePublic, type Obra } from "@/lib/supabase";
import CatalogoGrid from "@/components/CatalogoGrid";

export const revalidate = 0; // siempre datos frescos del catálogo

async function getObras(): Promise<Obra[]> {
  const { data, error } = await supabasePublic
    .from("obras")
    .select("*")
    .order("orden", { ascending: true, nullsFirst: false })
    .order("artista", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return data ?? [];
}

export default async function HomePage() {
  const obras = await getObras();

  return (
    <main className="bg-cream min-h-screen">
      <header className="px-6 md:px-12 pt-14 pb-10 md:pt-20 md:pb-16 text-center">
        <h1 className="font-display text-charcoal leading-[0.85] tracking-logo text-6xl md:text-8xl">
          goz
          <br />
          art
        </h1>
        <p className="font-sans text-graphite text-sm md:text-base mt-6">
          obras que trascienden con el tiempo
        </p>
      </header>

      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <CatalogoGrid obras={obras} />
      </section>

      <footer className="px-6 md:px-12 py-10 text-center border-t border-sand/60">
        <p className="font-script text-charcoal text-2xl mb-1">Gozart</p>
        <p className="font-sans text-xs text-stone">
          Reproducciones de arte curadas y enmarcadas — CABA, Argentina
        </p>
      </footer>
    </main>
  );
}
