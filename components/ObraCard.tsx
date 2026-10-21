import Link from "next/link";
import Image from "next/image";
import type { Obra } from "@/lib/supabase";

export default function ObraCard({ obra }: { obra: Obra }) {
  const href = `/obra/${obra.id}`;

  return (
    <div className="flex flex-col group">
      <Link
        href={href}
        className="relative aspect-[4/5] w-full bg-sand/20 mb-3 overflow-hidden rounded-md block"
        aria-label={`Ver ${obra.titulo}`}
      >
        {obra.imagen_url && (
          <Image
            src={obra.imagen_url}
            alt={`${obra.titulo} — ${obra.artista}`}
            fill
            className="object-contain p-4 md:p-6 transition-transform duration-700 ease-out group-hover:scale-105"
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
        {obra.precio1 == null
          ? "Precio a consultar"
          : `$${obra.precio1.toLocaleString("es-AR")}`}
      </p>

      <Link
        href={href}
        className="block w-full text-center border border-charcoal py-2.5 text-sm text-charcoal rounded-md hover:bg-charcoal hover:text-cream transition-colors"
      >
        Ver obra
      </Link>
    </div>
  );
}
