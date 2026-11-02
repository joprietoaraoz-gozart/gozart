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
    description: `${obra.titulo}, de ${obra.artista}. Reproducción fine art enmarcada a medida.`,
  };
}

function IconoWhatsApp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default async function ObraPage({ params }: { params: { id: string } }) {
  const obra = await getObra(params.id);
  if (!obra) notFound();

  const fotos = [obra.imagen_url, ...(obra.imagenes ?? [])].filter(
    (u): u is string => Boolean(u)
  );

  // Tamaño máximo de impresión (columna tamano_max en Supabase)
  const tamanoMax = (obra as Obra & { tamano_max?: string | null }).tamano_max;

  const linkArmar = wa(
    `Hola! Me interesa ${obra.titulo} de ${obra.artista} y quiero armar mi cuadro.`
  );

  const pasos = [
    "Nos escribís y te asesoramos.",
    "Definimos medidas, marco y presupuesto.",
    "En 15 a 20 días te llega listo para colgar. Envíos en CABA y alrededores.",
  ];

  const boton =
    "items-center justify-center gap-2.5 w-full bg-charcoal text-cream py-3.5 text-sm rounded-md hover:bg-graphite transition-colors";

  return (
    <main className="bg-cream min-h-screen pb-24 md:pb-0">
      <Navbar />

      <section className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 md:px-12 max-w-6xl mx-auto">
        <Link
          href="/catalogo"
          className="font-sans text-xs text-stone hover:text-charcoal inline-block mb-8"
        >
          ← Volver a obras
        </Link>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <FadeIn>
            <ObraGaleria fotos={fotos} alt={`${obra.titulo} — ${obra.artista}`} />
          </FadeIn>

          <FadeIn className="md:sticky md:top-28">
            <h1 className="font-display text-charcoal text-3xl md:text-4xl tracking-logo mb-2">
              {obra.titulo}
            </h1>
            <p className="font-sans text-sm text-stone mb-6">
              {obra.artista}
              {obra.anio ? ` · ${obra.anio}` : ""}
            </p>

            <p className="font-sans text-sm md:text-base text-charcoal leading-relaxed mb-7">
              Cada cuadro se arma a medida, pensado para tu espacio. Te ayudamos a elegir el
              tamaño, la varilla, el tono de madera y el paspartú que mejor van con tu hogar. Si
              ya tenés una idea, la armamos juntos.
            </p>

            <div className="mb-7">
              <p className="font-sans text-sm text-stone mb-2">Cómo funciona</p>
              <ol className="space-y-1">
                {pasos.map((paso, i) => (
                  <li key={i} className="grid grid-cols-[18px_1fr] font-sans text-sm text-graphite leading-normal">
                    <span className="font-display text-xs text-stone leading-[21px]">{i + 1}</span>
                    {paso}
                  </li>
                ))}
              </ol>
            </div>

            <p className="font-sans text-sm text-graphite leading-relaxed mb-1">
              Impresión fine art en papel Epson Enhanced 200g, enmarcada a mano en marupá con
              vidrio float. El tamaño del cuadro varía según el marco y el paspartú.
            </p>
            <p className="font-sans text-sm text-graphite mb-7">
              <span className="text-stone">Tamaño máximo de impresión:</span>{" "}
              {tamanoMax ? `hasta ${tamanoMax}` : "a consultar"}
            </p>

            {/* En el celu se usa el botón fijo de abajo */}
            <a href={linkArmar} target="_blank" rel="noopener noreferrer" className={`hidden md:flex ${boton}`}>
              <IconoWhatsApp className="w-[18px] h-[18px]" />
              Armar mi cuadro
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Celular: botón fijo abajo (reemplaza al botón redondo de WhatsApp en esta página) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-cream border-t border-sand px-6 pt-3 pb-5">
        <a href={linkArmar} target="_blank" rel="noopener noreferrer" className={`flex ${boton}`}>
          <IconoWhatsApp className="w-[18px] h-[18px]" />
          Armar mi cuadro
        </a>
      </div>

      <Footer />
    </main>
  );
}
