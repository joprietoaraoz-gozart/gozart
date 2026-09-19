import { supabaseAdmin, type Obra } from "@/lib/supabase";
import AdminClient from "./AdminClient";

export const revalidate = 0;

async function getObras(): Promise<Obra[]> {
  const { data, error } = await supabaseAdmin
    .from("obras")
    .select("*")
    .order("artista", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return data ?? [];
}

export default async function AdminPage() {
  const obras = await getObras();
  return <AdminClient obrasIniciales={obras} />;
}
