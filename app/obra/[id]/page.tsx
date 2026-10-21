import Link from "next/link";
import { notFound } from "next/navigation";
import { supabasePublic, type Obra } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ObraGaleria from "@/components/ObraGaleria";

export const revalidate = 0;

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const wa = (texto: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

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
    description:
      obra.descripcion ?? `${obra.titulo}, de ${obra.artista}. Reproducción enmarcada.`,
  };
}

const precio = (n: number) => `$${n.toLocaleString("es-AR")}`;

export default async function ObraPage({ params }: { params: { id: string } }) {
  const obra = await getObra(params.id);
  if (!obra) notFound();

  const fotos = [obra.imagen_url, ...(obra.imagenes ?? [])].filter(
    (u): u is string => Boolean(u)
  );

  const obraTxt = `${obra.titulo} de ${obra.artista}`;
  const linkComprar =
    obra.precio1 != null
      ? wa(
          `Hola! Quiero comprar ${obraTxt} tal cual está publicada` +
            (obra.tamano1 ? ` (${obra.tamano1} – ${precio(obra.precio1)}).` : ` (${precio(obra.precio1)}).`)
        )
      : wa(`Hola! Quiero consultar el precio de ${obraTxt}` + (obra.tamano1 ? ` (${obra.tamano1}).` : "."));
  const linkPersonalizado = wa(
    `Hola! Me interesa ${obraTxt}, pero quiero armarlo de manera personalizada.`
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
              <p className="font-sans text-sm text-graphite leading-relaxed whitespace-pre-line mb-6">
                {obra.descripcion}
              </p>
            )}

            <div className="border-t border-sand pt-6 pb-6">
              {obra.tamano1 && (
                <p className="font-sans text-sm text-charcoal mb-1">
                  <span className="text-stone">Tamaño:</span> {obra.tamano1}
                </p>
              )}
              <p className="font-sans text-lg text-charcoal mb-5">
                {obra.precio1 != null ? precio(obra.precio1) : "Precio a consultar"}
              </p>
              <a
                href={linkComprar}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-charcoal text-cream py-3 text-sm rounded-md hover:bg-graphite transition-colors"
              >
                {obra.precio1 != null ? "Comprar" : "Consultar"}
              </a>
              <p className="font-sans text-xs text-stone leading-relaxed mt-3">
                Elaborado a pedido: 15 a 20 días hábiles (impresión y enmarcado artesanal).
              </p>
            </div>

            <div className="border-t border-sand pt-6">
              <p className="font-sans text-xs uppercase text-stone mb-2">Opción personalizada</p>
              <p className="font-sans text-sm text-graphite leading-relaxed mb-4">
                Si querés modificar algo del armado del cuadro, contactate con nosotros y lo
                hacemos de manera personalizada!
              </p>
              <a
                href={linkPersonalizado}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center border border-charcoal py-3 text-sm text-charcoal rounded-md hover:bg-charcoal hover:text-cream transition-colors"
              >
                Escribinos
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
