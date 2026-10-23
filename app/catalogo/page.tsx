import { supabasePublic, type Obra } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import CatalogoGrid from "@/components/CatalogoGrid";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export const revalidate = 0;

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

export default async function CatalogoPage() {
  const obras = await getObras();

  return (
    <main className="bg-cream min-h-screen">
      <Navbar />
      <div className="pt-32 pb-10 px-6 md:px-12 text-center">
        <FadeIn>
          <h1 className="font-display text-charcoal text-4xl md:text-6xl tracking-logo">
            Obras
          </h1>
          <p className="font-sans text-stone text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Cada obra se imprime en papel fine art y se enmarca a mano en Buenos Aires. Está lista en 15 a 20 días y llega preparada para colgar. Hacemos envíos en CABA y alrededores.
          </p>
        </FadeIn>
      </div>

      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <CatalogoGrid obras={obras} />
      </section>

      <Footer />
    </main>
  );
}
