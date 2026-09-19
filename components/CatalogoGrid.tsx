"use client";

import { useMemo, useState } from "react";
import type { Obra } from "@/lib/supabase";
import ObraCard from "./ObraCard";

export default function CatalogoGrid({ obras }: { obras: Obra[] }) {
  const artistas = useMemo(() => {
    const set = new Set(obras.map((o) => o.artista));
    return Array.from(set).sort();
  }, [obras]);

  const [filtro, setFiltro] = useState<string | null>(null);

  const visibles = filtro ? obras.filter((o) => o.artista === filtro) : obras;

  return (
    <div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-10 text-sm">
        <button
          onClick={() => setFiltro(null)}
          className={`pb-0.5 border-b ${
            filtro === null
              ? "border-charcoal text-charcoal"
              : "border-transparent text-stone hover:text-charcoal"
          }`}
        >
          Todos
        </button>
        {artistas.map((a) => (
          <button
            key={a}
            onClick={() => setFiltro(a)}
            className={`pb-0.5 border-b ${
              filtro === a
                ? "border-charcoal text-charcoal"
                : "border-transparent text-stone hover:text-charcoal"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <p className="text-stone text-sm">No hay obras para mostrar todavía.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {visibles.map((obra) => (
            <ObraCard key={obra.id} obra={obra} />
          ))}
        </div>
      )}
    </div>
  );
}
