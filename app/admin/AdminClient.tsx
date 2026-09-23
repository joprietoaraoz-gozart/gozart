"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Obra } from "@/lib/supabase";

type FormState = {
  id?: string;
  artista: string;
  titulo: string;
  anio: string;
  tamano1: string;
  precio1: string;
  tamano2: string;
  precio2: string;
  imagen_url: string;
};

const EMPTY: FormState = {
  artista: "",
  titulo: "",
  anio: "",
  tamano1: "",
  precio1: "",
  tamano2: "",
  precio2: "",
  imagen_url: "",
};

export default function AdminClient({
  obrasIniciales,
}: {
  obrasIniciales: Obra[];
}) {
  const [obras, setObras] = useState<Obra[]>(obrasIniciales);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const router = useRouter();

  function resetForm() {
    setForm(EMPTY);
  }

  function editarObra(o: Obra) {
    setForm({
      id: o.id,
      artista: o.artista,
      titulo: o.titulo,
      anio: o.anio ?? "",
      tamano1: o.tamano1,
      precio1: String(o.precio1 ?? ""),
      tamano2: o.tamano2 ?? "",
      precio2: o.precio2 != null ? String(o.precio2) : "",
      imagen_url: o.imagen_url ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function subirImagen(file: File) {
    setSubiendo(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setSubiendo(false);
    if (res.ok) {
      setForm((f) => ({ ...f, imagen_url: data.url }));
    } else {
      alert("Error al subir la imagen: " + data.error);
    }
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);

    const payload = {
      artista: form.artista,
      titulo: form.titulo,
      anio: form.anio,
      tamano1: form.tamano1,
      precio1: Number(form.precio1),
      tamano2: form.tamano2 || null,
      precio2: form.precio2 ? Number(form.precio2) : null,
      imagen_url: form.imagen_url,
    };

    const res = await fetch(form.id ? `/api/obras/${form.id}` : "/api/obras", {
      method: form.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setGuardando(false);

    if (!res.ok) {
      alert("Error al guardar: " + data.error);
      return;
    }

    if (form.id) {
      setObras((prev) => prev.map((o) => (o.id === form.id ? data : o)));
    } else {
      setObras((prev) => [...prev, data]);
    }
    resetForm();
  }

  async function eliminar(id: string) {
    if (!confirm("¿Seguro que querés eliminar esta obra?")) return;
    const res = await fetch(`/api/obras/${id}`, { method: "DELETE" });
    if (res.ok) {
      setObras((prev) => prev.filter((o) => o.id !== id));
    } else {
      alert("No se pudo eliminar");
    }
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <main className="bg-cream min-h-screen px-6 md:px-12 py-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-3xl tracking-logo">
          gozart admin
        </h1>
        <button
          onClick={logout}
          className="text-xs text-stone hover:text-charcoal underline"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Formulario de alta / edición */}
      <form
        onSubmit={guardar}
        className="border border-sand p-5 md:p-6 mb-12 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <h2 className="col-span-full font-sans text-sm text-graphite uppercase">
          {form.id ? "Editar obra" : "Nueva obra"}
        </h2>

        <input
          placeholder="Artista"
          value={form.artista}
          onChange={(e) => setForm({ ...form, artista: e.target.value })}
          className="border border-sand bg-cream px-3 py-2 text-sm outline-none focus:border-charcoal"
          required
        />
        <input
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          className="border border-sand bg-cream px-3 py-2 text-sm outline-none focus:border-charcoal"
          required
        />
        <input
          placeholder="Año"
          value={form.anio}
          onChange={(e) => setForm({ ...form, anio: e.target.value })}
          className="border border-sand bg-cream px-3 py-2 text-sm outline-none focus:border-charcoal"
        />
        <div />

        <input
          placeholder="Tamaño 1 (ej. 30x40)"
          value={form.tamano1}
          onChange={(e) => setForm({ ...form, tamano1: e.target.value })}
          className="border border-sand bg-cream px-3 py-2 text-sm outline-none focus:border-charcoal"
          required
        />
        <input
          placeholder="Precio 1"
          type="number"
          value={form.precio1}
          onChange={(e) => setForm({ ...form, precio1: e.target.value })}
          className="border border-sand bg-cream px-3 py-2 text-sm outline-none focus:border-charcoal"
          required
        />
        <input
          placeholder="Tamaño 2 (opcional)"
          value={form.tamano2}
          onChange={(e) => setForm({ ...form, tamano2: e.target.value })}
          className="border border-sand bg-cream px-3 py-2 text-sm outline-none focus:border-charcoal"
        />
        <input
          placeholder="Precio 2 (opcional)"
          type="number"
          value={form.precio2}
          onChange={(e) => setForm({ ...form, precio2: e.target.value })}
          className="border border-sand bg-cream px-3 py-2 text-sm outline-none focus:border-charcoal"
        />

        <div className="col-span-full flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) subirImagen(file);
            }}
            className="text-xs"
          />
          {subiendo && <span className="text-xs text-stone">Subiendo...</span>}
          {form.imagen_url && (
            <div className="relative w-16 h-16">
              <Image
                src={form.imagen_url}
                alt="preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="col-span-full flex gap-3 mt-2">
          <button
            type="submit"
            disabled={guardando || subiendo}
            className="bg-charcoal text-cream px-5 py-2.5 text-sm hover:bg-graphite transition-colors disabled:opacity-50"
          >
            {guardando ? "Guardando..." : form.id ? "Guardar cambios" : "Agregar obra"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-stone hover:text-charcoal"
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      {/* Listado */}
      <h2 className="font-sans text-sm text-graphite uppercase mb-4">
        Catálogo ({obras.length})
      </h2>
      <div className="space-y-2">
        {obras.map((o) => (
          <div
            key={o.id}
            className="flex items-center gap-4 border border-sand/70 px-4 py-3"
          >
            <div className="relative w-12 h-12 flex-shrink-0 bg-sand/30">
              {o.imagen_url && (
                <Image
                  src={o.imagen_url}
                  alt={o.titulo}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-charcoal truncate">{o.titulo}</p>
              <p className="text-xs text-stone truncate">
                {o.artista} · {o.tamano1} · ${o.precio1}
                {o.tamano2 ? ` / ${o.tamano2} · $${o.precio2}` : ""}
              </p>
            </div>
            <button
              onClick={() => editarObra(o)}
              className="text-xs text-graphite hover:text-charcoal underline flex-shrink-0"
            >
              Editar
            </button>
            <button
              onClick={() => eliminar(o.id)}
              className="text-xs text-red-800 hover:underline flex-shrink-0"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
