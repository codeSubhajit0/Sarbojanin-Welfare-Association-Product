import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Server-only Firebase Admin SDK — used by API routes, the admin layout,
 * and middleware-adjacent server code to verify session cookies and read/
 * write Firestore with full privileges (bypassing security rules, since
 * these routes do their own auth checks in code).
 *
 * Lazily initialized so a missing/invalid service account only throws when
 * something actually calls adminAuth()/adminDb() at request time — not at
 * module import time, which would otherwise break `next build`.
 */
let app: App | null = null;

function getAdminApp(): App {
    if (app) return app;
    if (getApps().length) {
        app = getApps()[0];
        return app;
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    // Service account private keys are stored in .env with literal "\n"
    // sequences (since real newlines aren't valid in .env files) — restore
    // them to real newlines before handing the key to the SDK.
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error(
            "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, " +
            "and FIREBASE_PRIVATE_KEY in .env.local (see .env.local)."
        );
    }

    app = initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
    });
    return app;
}

export function adminAuth(): Auth {
    return getAuth(getAdminApp());
}

export function adminDb(): Firestore {
    return getFirestore(getAdminApp());
}
