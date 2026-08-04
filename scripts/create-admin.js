/**
 * Creates (or promotes) the single admin account for the dashboard.
 *
 * Firebase Auth has no built-in "role" concept, so admin access is granted
 * via a custom claim (`admin: true`) that /api/auth/session and every
 * protected route check for. This script is the only way to set that claim
 * — there's no sign-up flow in the app itself, by design.
 *
 * Usage:
 *   node scripts/create-admin.js "admin@sarbojoninwelfare.org" "yourStrongPassword"
 *
 * Requires FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and
 * FIREBASE_PRIVATE_KEY to be set in your environment (loaded from
 * .env.local below).
 */
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

async function main() {
  const [, , email, password] = process.argv;
  if (!email || !password) {
    console.error(
      'Usage: node scripts/create-admin.js "admin@example.com" "yourStrongPassword"'
    );
    process.exit(1);
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.error(
      "Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY in .env.local.\n" +
        "Get these from Firebase Console → Project Settings → Service Accounts → Generate new private key."
    );
    process.exit(1);
  }

  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  const auth = getAuth();

  let user;
  try {
    user = await auth.getUserByEmail(email);
    console.log(`Found existing user ${email} (uid: ${user.uid}). Updating password...`);
    await auth.updateUser(user.uid, { password });
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      console.log(`Creating new user ${email}...`);
      user = await auth.createUser({ email, password, emailVerified: true });
    } else {
      throw err;
    }
  }

  await auth.setCustomUserClaims(user.uid, { admin: true });

  console.log(`\n✅ ${email} is now an admin (uid: ${user.uid}).`);
  console.log("They can sign in at /login with the email + password you just set.");
  console.log(
    "\nNote: if they were already signed in elsewhere, they'll need to sign in again for the new claim to take effect."
  );
}

main().catch((err) => {
  console.error("Failed to create/promote admin:", err);
  process.exit(1);
});
