import Link from "next/link";
import { notFound } from "next/navigation";
import { supabasePublic, type Obra } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ObraGaleria from "@/components/ObraGaleria";
import WhatsAppModal from "@/components/WhatsAppModal";

export const revalidate = 0;

async function getObra(id: string): Promise<Obra | null> {
  const { data, error } = await supabasePublic
    .from("obras")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const obra = await getObra(params.id);
  if (!obra) return { title: "Obra no encontrada — Gozart" };
  return {
    title: `${obra.titulo} — ${obra.artista} | Gozart`,
    description: obra.descripcion ?? `${obra.titulo}, de ${obra.artista}. Reproducción enmarcada.`,
  };
}

const precio = (n: number) => `$${n.toLocaleString("es-AR")}`;

export default async function ObraPage({ params }: { params: { id: string } }) {
  const obra = await getObra(params.id);
  if (!obra) notFound();

  const fotos = [obra.imagen_url, ...(obra.imagenes ?? [])].filter(
    (u): u is string => Boolean(u)
  );

  return (
    <main className="bg-cream min-h-screen">
      <Navbar />

      <section className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 md:px-12 max-w-6xl mx-auto">
        <Link
          href="/catalogo"
          className="font-sans text-xs text-stone hover:text-charcoal inline-block mb-8"
        >
          ← Volver al catálogo
        </Link>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <FadeIn>
            <ObraGaleria fotos={fotos} alt={`${obra.titulo} — ${obra.artista}`} />
          </FadeIn>

          <FadeIn className="md:sticky md:top-28">
            <h1 className="font-display text-charcoal text-3xl md:text-4xl tracking-logo mb-3">
              {obra.titulo}
            </h1>
            <p className="font-sans text-sm text-stone mb-8">
              {obra.artista}
              {obra.anio ? ` · ${obra.anio}` : ""}
            </p>

            {obra.descripcion && (
              <div className="font-sans text-sm text-graphite leading-relaxed whitespace-pre-line mb-8">
                {obra.descripcion}
              </div>
            )}

            <div className="border-t border-sand pt-6 mb-8 space-y-2">
              {obra.precio1 != null ? (
                <>
                  <p className="font-sans text-xs uppercase text-stone mb-3">Tamaños</p>
                  <p className="font-sans text-sm text-charcoal flex justify-between">
                    <span>{obra.tamano1}</span>
                    <span>{precio(obra.precio1)}</span>
                  </p>
                  {obra.tamano2 && obra.precio2 != null && (
                    <p className="font-sans text-sm text-charcoal flex justify-between">
                      <span>{obra.tamano2}</span>
                      <span>{precio(obra.precio2)}</span>
                    </p>
                  )}
                </>
              ) : (
                <p className="font-sans text-sm text-charcoal">
                  {obra.tamano1 ? `${obra.tamano1} · ` : ""}Precio a consultar
                </p>
              )}
            </div>

            <WhatsAppModal obra={obra} />

            <p className="font-sans text-xs text-stone leading-relaxed mt-6">
            Elaborado a pedido: 15 a 20 días hábiles (impresión y enmarcado artesanal).
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
