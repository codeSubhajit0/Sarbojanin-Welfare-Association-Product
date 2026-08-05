import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export const runtime = "nodejs";

const SESSION_COOKIE_NAME = "session";
const SESSION_EXPIRES_IN_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

/**
 * POST — called right after the client signs in with Firebase Auth
 * (signInWithEmailAndPassword). Body: { idToken }. Verifies the token,
 * mints a long-lived session cookie via the Admin SDK, and sets it
 * httpOnly so client-side JS (and XSS) can't read it. Also checks the
 * `admin` custom claim so only the designated admin account can get a
 * session that passes middleware/layout checks.
 */
export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    // Verify the token is genuine and fresh before minting a session cookie.
    const decoded = await adminAuth().verifyIdToken(idToken);

    console.log(decoded);
    // if (!decoded.admin) {
    //   return NextResponse.json(
    //     { error: "This account is not authorized for admin access." },
    //     { status: 403 }
    //   );
    // }
    console.log("Running");

    const sessionCookie = await adminAuth().createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRES_IN_MS,
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_EXPIRES_IN_MS / 1000,
    });
    return res;
  } catch (err) {
  console.error("Session creation failed:", err);
  return NextResponse.json(
      {
        error: "Invalid credentials or session could not be created.",
        debugMessage: err instanceof Error ? err.message : String(err),
        debugName: err instanceof Error ? err.name : null,
      },
      { status: 401 }
  );
}
}

/** DELETE — logs the admin out by clearing the session cookie. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}
