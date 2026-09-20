import type { Obra } from "@/lib/supabase";
import WhatsAppModal from "./WhatsAppModal";
import ObraImage from "./ObraImage";

export default function ObraCard({ obra }: { obra: Obra }) {
  const precioDesde = obra.precio2
    ? Math.min(obra.precio1, obra.precio2)
    : obra.precio1;

  return (
    <div className="flex flex-col group">
      {obra.imagen_url && (
        <ObraImage
          src={obra.imagen_url}
          alt={`${obra.titulo} — ${obra.artista}`}
        />
      )}

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
