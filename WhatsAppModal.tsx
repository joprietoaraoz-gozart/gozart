"use client";

import { useState } from "react";
import type { Obra } from "@/lib/supabase";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export default function WhatsAppModal({ obra }: { obra: Obra }) {
  const [open, setOpen] = useState(false);
  const [tamanoElegido, setTamanoElegido] = useState<"1" | "2">("1");

  const tamano = tamanoElegido === "1" ? obra.tamano1 : obra.tamano2!;
  const precio = tamanoElegido === "1" ? obra.precio1 : obra.precio2!;

  const mensaje = encodeURIComponent(
    `Hola! Quiero consultar por esta obra de Gozart:\n\n` +
      `${obra.titulo} — ${obra.artista}\n` +
      `Tamaño: ${tamano}\n` +
      `Precio: $${precio.toLocaleString("es-AR")}`
  );

  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full border border-charcoal py-2.5 text-sm tracking-wide text-charcoal hover:bg-charcoal hover:text-cream transition-colors"
      >
        Comprar
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-cream max-w-sm w-full p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl text-charcoal mb-1 tracking-logo">
              {obra.titulo}
            </h3>
            <p className="text-sm text-graphite mb-5">{obra.artista}</p>

            {obra.tamano2 && obra.precio2 ? (
              <div className="mb-5 space-y-2">
                <p className="text-xs uppercase text-stone mb-2">Elegí un tamaño</p>
                {(["1", "2"] as const).map((opcion) => {
                  const t = opcion === "1" ? obra.tamano1 : obra.tamano2!;
                  const p = opcion === "1" ? obra.precio1 : obra.precio2!;
                  return (
                    <label
                      key={opcion}
                      className={`flex items-center justify-between border px-3 py-2 cursor-pointer text-sm ${
                        tamanoElegido === opcion
                          ? "border-charcoal bg-sand/40"
                          : "border-sand"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="tamano"
                          checked={tamanoElegido === opcion}
                          onChange={() => setTamanoElegido(opcion)}
                        />
                        {t}
                      </span>
                      <span>${p.toLocaleString("es-AR")}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="mb-5 text-sm text-charcoal">
                {obra.tamano1} — ${obra.precio1.toLocaleString("es-AR")}
              </p>
            )}

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-charcoal text-cream py-3 text-sm tracking-wide hover:bg-graphite transition-colors"
            >
              Continuar por WhatsApp
            </a>

            <button
              onClick={() => setOpen(false)}
              className="w-full text-center text-xs text-stone mt-4 hover:text-charcoal"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
