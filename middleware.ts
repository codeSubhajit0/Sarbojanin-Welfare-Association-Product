import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge-runtime middleware can't run the Firebase Admin SDK (it needs Node
 * APIs), so this only does a cheap presence check on the session cookie —
 * enough to bounce obviously-logged-out visitors immediately. The real
 * cryptographic verification (signature, expiry, revocation, admin claim)
 * happens in app/admin/layout.tsx, which runs on the Node.js runtime and
 * calls adminAuth().verifySessionCookie(). Both layers matter: middleware
 * alone would trust a forged/expired cookie; the layout alone would still
 * render an extra round-trip for anonymous visitors before redirecting.
 */
export function middleware(req: NextRequest) {
  const hasSession = req.cookies.has("session");

  if (!hasSession) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
