import { NextRequest, NextResponse } from "next/server";

/**
 * HTTPS enforcement (defence in depth).
 * Most hosts (Vercel/Netlify/Cloudflare) already redirect HTTP→HTTPS at the
 * edge and terminate TLS. This middleware adds a redirect for any environment
 * that forwards plain HTTP, using the standard x-forwarded-proto header.
 *
 * Combined with the Strict-Transport-Security header in next.config.ts, this
 * makes the site HTTPS-only.
 */
export function middleware(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto");
  // Only act when we can see a forwarded protocol and it's explicitly http.
  if (proto && proto === "http") {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Run on all paths except static assets and Next internals.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};
