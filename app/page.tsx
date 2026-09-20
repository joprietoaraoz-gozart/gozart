import { supabasePublic, type Obra } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturedWorks from "@/components/FeaturedWorks";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const revalidate = 0;

async function getObras(limit?: number): Promise<Obra[]> {
  let query = supabasePublic
    .from("obras")
    .select("*")
    .order("orden", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error(error);
    return [];
  }
  return data ?? [];
}

export default async function HomePage() {
  const destacadas = await getObras(8);
  const imagenesHero = destacadas
    .map((o) => o.imagen_url)
    .filter((u): u is string => Boolean(u))
    .slice(0, 6);

  return (
    <main className="bg-cream min-h-screen">
      <Navbar />
      <Hero imagenes={imagenesHero} />
      <AboutSection />
      <FeaturedWorks obras={destacadas} />
      <ContactSection />
      <Footer />
    </main>
  );
}
