import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";
import type { DecodedIdToken } from "firebase-admin/auth";

/**
 * Reads the `session` cookie (if present) and verifies it against Firebase
 * Auth via the Admin SDK, checking revocation too. Returns the decoded
 * token (with the `admin` custom claim) if valid, or `null` otherwise.
 *
 * Safe to call from Server Components, Route Handlers, and Server Actions —
 * anywhere that runs on the Node.js runtime (not Edge middleware, which
 * can't run the Admin SDK).
 */
export async function getAdminSession(): Promise<DecodedIdToken | null> {
    const sessionCookie = cookies().get("session")?.value;
    if (!sessionCookie) return null;

    try {
        const decoded = await adminAuth().verifySessionCookie(sessionCookie, true);
        if (!decoded.admin) return null;
        return decoded;
    } catch {
        return null;
    }
}

