import Link from "next/link";
import Image from "next/image";
import type { Obra } from "@/lib/supabase";
import WhatsAppModal from "./WhatsAppModal";

export default function ObraCard({ obra }: { obra: Obra }) {
  const precioDesde =
    obra.precio1 == null
      ? null
      : obra.precio2
      ? Math.min(obra.precio1, obra.precio2)
      : obra.precio1;
  const href = `/obra/${obra.id}`;

  return (
    <div className="flex flex-col group">
      <Link
        href={href}
        className="relative aspect-[4/5] w-full bg-sand/30 mb-3 overflow-hidden block"
        aria-label={`Ver ${obra.titulo}`}
      >
        {obra.imagen_url && (
          <Image
            src={obra.imagen_url}
            alt={`${obra.titulo} — ${obra.artista}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
      </Link>

      <Link href={href}>
        <h3
          className="font-sans text-sm text-charcoal leading-tight hover:underline line-clamp-2 min-h-[2.5em]"
          title={obra.titulo}
        >
          {obra.titulo}
        </h3>
      </Link>
      <p className="font-sans text-xs text-stone mb-1 truncate">
        {obra.artista}
        {obra.anio ? ` · ${obra.anio}` : ""}
      </p>
      <p className="font-sans text-xs text-graphite mb-3">
        {precioDesde == null
          ? "Precio a consultar"
          : `${obra.tamano2 ? "Desde " : ""}$${precioDesde.toLocaleString("es-AR")}`}
      </p>

      <WhatsAppModal obra={obra} />
    </div>
  );
}
