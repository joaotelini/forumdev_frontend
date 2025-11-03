import { cookies } from "next/headers";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

const publicRoutes = [
  { path: "/login", whenAuth: "redirect" },
  { path: "/signup", whenAuth: "redirect" },
];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicRoute = publicRoutes.find((route) => route.path === path);

  const cookiesPage = await cookies();
  const token = cookiesPage.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!token && publicRoute) {
    return NextResponse.next();
  }

  if (!token && !publicRoute) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && publicRoute?.whenAuth === "redirect") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        ("Token expirado");
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    } catch (err) {
      console.error("Erro ao decodificar token:", err);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
