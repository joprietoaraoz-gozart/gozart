import Image from "next/image";
import type { Obra } from "@/lib/supabase";
import WhatsAppModal from "./WhatsAppModal";

export default function ObraCard({ obra }: { obra: Obra }) {
  const precioDesde = obra.precio2
    ? Math.min(obra.precio1, obra.precio2)
    : obra.precio1;

  return (
    <div className="flex flex-col group">
      <div className="relative aspect-[4/5] bg-sand/30 mb-3 overflow-hidden">
        {obra.imagen_url && (
          <Image
            src={obra.imagen_url}
            alt={`${obra.titulo} — ${obra.artista}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
      </div>

      <h3 className="font-sans text-sm text-charcoal leading-tight">
        {obra.titulo}
      </h3>
      <p className="font-sans text-xs text-stone mb-1">
        {obra.artista}
        {obra.anio ? ` · ${obra.anio}` : ""}
      </p>
      <p className="font-sans text-xs text-graphite mb-3">
        {obra.tamano2 ? "Desde " : ""}${precioDesde.toLocaleString("es-AR")}
      </p>

      <WhatsAppModal obra={obra} />
    </div>
  );
}
