-- Ejecutar esto en Supabase → SQL Editor → New query → Run

create table if not exists obras (
  id uuid primary key default gen_random_uuid(),
  artista text not null,
  titulo text not null,
  anio text,
  tamano1 text not null,
  precio1 numeric not null,
  tamano2 text,
  precio2 numeric,
  imagen_url text,
  orden int,
  created_at timestamptz default now()
);

-- Habilita Row Level Security y permite lectura pública (el catálogo es público),
-- pero la escritura queda bloqueada para el público: solo el admin escribe,
-- usando la Service Role Key desde el servidor (que se salta RLS).
alter table obras enable row level security;

create policy "Lectura pública del catálogo"
  on obras for select
  using (true);

-- Bucket de imágenes (correr en SQL Editor también, o crearlo a mano en
-- Storage → New bucket → nombre "obras" → Public bucket = ON)
insert into storage.buckets (id, name, public)
values ('obras', 'obras', true)
on conflict (id) do nothing;
