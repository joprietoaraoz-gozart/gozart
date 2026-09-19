# Gozart — sitio del catálogo

Sitio del catálogo de Gozart. Vos misma podés agregar, editar y borrar obras desde
`/admin` (sin tocar código). Cada obra tiene un botón "Comprar" que abre un popup
y te manda a WhatsApp con el pedido ya armado (título, tamaño y precio) para
cerrar la venta por ese medio.

## Qué es cada cosa

- **El sitio** (Next.js) — se sube a Vercel, gratis.
- **La base de datos** (Supabase) — donde vive el catálogo (obras, precios,
  imágenes). Es gratis y tiene una tabla tipo Excel que podés mirar/editar
  también directo ahí si alguna vez lo necesitás, pero el día a día lo hacés
  desde `/admin`.

Vos administrás todo desde `tusitio.com/admin` — Supabase queda "atrás", no
hace falta que entres ahí para el uso normal.

---

## Paso 1 — Crear el proyecto en Supabase (la base de datos)

1. Andá a [supabase.com](https://supabase.com) → **Start your project** → creá
   una cuenta gratis (con GitHub o email).
2. **New project** → ponele nombre "gozart" → elegí una contraseña de base de
   datos (guardala, no la vas a necesitar de nuevo si no la perdés) → región
   más cercana (South America / São Paulo si está disponible).
3. Esperá 1-2 minutos a que se cree.
4. Andá a **SQL Editor** (ícono en la barra lateral) → **New query**.
5. Abrí el archivo `supabase-setup.sql` de esta carpeta, copiá todo su
   contenido, pegalo ahí, y click **Run**. Esto crea la tabla de obras y el
   espacio para las imágenes.
6. Andá a **Settings** (ícono de tuerca) → **API**. Ahí vas a ver 3 datos que
   necesitás para el paso 3:
   - **Project URL**
   - **anon public** key
   - **service_role** key (¡esta es secreta, no la compartas ni la subas a
     ningún lado público!)

## Paso 2 — Subir el código a GitHub

Vercel despliega el sitio leyendo un repositorio de GitHub.

1. Creá una cuenta en [github.com](https://github.com) si no tenés.
2. Creá un repositorio nuevo (**New repository**), nombre "gozart-site",
   privado.
3. Subí todos los archivos de esta carpeta a ese repositorio (podés arrastrar
   los archivos directo en la web de GitHub con "uploading an existing file",
   o pedirle a alguien con Git que lo suba por vos — cualquiera de las dos
   formas sirve, es un solo paso único).

## Paso 3 — Desplegar en Vercel

1. Andá a [vercel.com](https://vercel.com) → **Sign up** (con GitHub, así se
   conecta directo).
2. **Add New → Project** → elegí el repositorio "gozart-site" → **Import**.
3. Antes de darle "Deploy", abrí **Environment Variables** y cargá estas 5
   (los valores de Supabase son los que copiaste en el Paso 1):

   | Nombre | Valor |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL de Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key de Supabase |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role key de Supabase |
   | `ADMIN_PASSWORD` | La contraseña que quieras para entrar a `/admin` |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | Tu WhatsApp, formato `5491122334455` (código de país + código de área sin el 0 + número, todo junto, sin +) |

4. Click **Deploy**. En 1-2 minutos tenés el sitio andando en una URL tipo
   `gozart-site.vercel.app`.
5. (Opcional, más adelante) en **Settings → Domains** podés conectar un
   dominio propio como `gozart.com.ar` si comprás uno.

## Paso 4 — Cargar tu primera obra

1. Entrá a `tusitio.vercel.app/admin`.
2. Ingresá la contraseña que pusiste en `ADMIN_PASSWORD`.
3. Completá el formulario de arriba (artista, título, año, tamaño y precio —
   el segundo tamaño/precio es opcional, para obras que ofrecés en 2 medidas),
   subí la foto, y **Agregar obra**.
4. Andá a la home del sitio y confirmá que aparece.

Repetís esto por cada obra del catálogo (o me pedís que te arme un script que
cargue muchas de una a partir de tu Excel, una vez que tengas todo prolijo).

---

## Cómo se ve el flujo de compra para el visitante

1. Ve el catálogo, filtra por artista si quiere.
2. Click en **Comprar** en la obra que le interesa.
3. Se abre un popup: si la obra tiene 2 tamaños, elige uno.
4. Click en **Continuar por WhatsApp** → se abre WhatsApp (web o app) con un
   mensaje ya escrito: título, artista, tamaño y precio — solo tiene que
   enviarlo.

No hay pago online ni checkout — la venta se cierra por WhatsApp, como
pediste.

## Actualizar el sitio más adelante

Si en el futuro querés cambiar algo del diseño (colores, tipografía, textos
fijos como el tagline del header), avisame y lo ajustamos en el código — eso
sí requiere volver a desplegar. Agregar/editar/borrar obras, en cambio, lo
hacés vos sola desde `/admin` en cualquier momento, sin tocar código ni volver
a desplegar nada.
