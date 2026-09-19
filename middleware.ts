import { NextRequest, NextResponse } from "next/server";

// Protege /admin y las rutas de API que modifican datos (todo excepto GET).
// La sesión es una cookie httpOnly con el valor de ADMIN_PASSWORD (comparación
// simple, alcanza para un panel interno de un solo usuario).
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isProtectedApi =
    (pathname.startsWith("/api/obras") && req.method !== "GET") ||
    pathname.startsWith("/api/upload");

  if (!isAdminPage && !isProtectedApi) {
    return NextResponse.next();
  }

  const session = req.cookies.get("gozart_admin_session")?.value;
  const expected = process.env.ADMIN_PASSWORD;

  if (session && expected && session === expected) {
    return NextResponse.next();
  }

  if (isAdminPage) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.json({ error: "No autorizado" }, { status: 401 });
}

export const config = {
  matcher: ["/admin/:path*", "/api/obras/:path*", "/api/upload/:path*"],
};
