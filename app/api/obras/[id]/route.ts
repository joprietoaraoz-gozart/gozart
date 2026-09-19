import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("obras")
    .update({
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
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = await supabaseAdmin.from("obras").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
