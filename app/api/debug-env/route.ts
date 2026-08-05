// app/api/debug-env/route.ts
export const runtime = "nodejs";

export async function GET() {
    return Response.json({
        hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
        hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
        privateKeyStartsCorrectly: process.env.FIREBASE_PRIVATE_KEY?.startsWith("-----BEGIN"),
        privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length ?? 0,
    });
}