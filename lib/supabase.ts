import { createClient } from "@supabase/supabase-js";

// Cliente público — solo lectura, usado por el catálogo (visitantes del sitio).
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Cliente con permisos de escritura — SOLO se usa en el servidor (API routes del
// admin), nunca se expone al navegador. Usa la Service Role Key de Supabase.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type Obra = {
  id: string;
  artista: string;
  titulo: string;
  anio: string | null;
  tamano1: string;
  precio1: number;
  tamano2: string | null;
  precio2: number | null;
  imagen_url: string | null;
  orden: number | null;
  created_at: string;
};
