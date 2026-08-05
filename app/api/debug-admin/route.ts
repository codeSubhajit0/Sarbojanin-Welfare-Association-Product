// app/api/debug-admin/route.ts
export const runtime = "nodejs";

import { adminAuth } from "@/lib/firebase-admin";

export async function GET() {
    try {
        // Just initializing + touching the Auth instance is enough to
        // trigger cert()/initializeApp() if it's going to fail.
        const auth = adminAuth();
        return Response.json({ ok: true, hasAuth: !!auth });
    } catch (err) {
        return Response.json(
            {
                ok: false,
                message: err instanceof Error ? err.message : String(err),
                stack: err instanceof Error ? err.stack : null,
            },
            { status: 500 }
        );
    }
}