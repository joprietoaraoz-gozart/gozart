import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, supabasePublic } from "@/lib/supabase";

// GET es público — lo usa la página del catálogo.
export async function GET() {
  const { data, error } = await supabasePublic
    .from("obras")
    .select("*")
    .order("orden", { ascending: true, nullsFirst: false })
    .order("artista", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST está protegido por el middleware (requiere sesión de admin).
export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("obras")
    .insert({
      artista: body.artista,
      titulo: body.titulo,
      anio: body.anio || null,
      tamano1: body.tamano1,
      precio1: body.precio1,
      tamano2: body.tamano2 || null,
      precio2: body.precio2 || null,
      imagen_url: body.imagen_url || null,
      orden: body.orden ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
