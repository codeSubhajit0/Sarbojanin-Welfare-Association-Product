# Sarbojonin Welfare Association — Website

A multi-page NGO/charitable-trust website built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **react-icons**, with a **Firebase**-backed admin dashboard (Auth + Firestore + Storage) for publishing blog posts and activities.

## Pages & Routing

Routing uses the Next.js App Router — every folder in `app/` is a route.

| Route            | File                                    | Description                                    |
|-------------------|-------------------------------------------|-------------------------------------------------|
| `/`               | `app/(site)/page.tsx`                     | Home — hero, focus areas, events, initiatives, stats |
| `/about`          | `app/(site)/about/page.tsx`               | About Us — mission, "why join us" grid, stats |
| `/programs`       | `app/(site)/programs/page.tsx`            | Our Programs — the 4 program pillars (linked from the Navbar dropdown with hash anchors) |
| `/initiatives`    | `app/(site)/initiatives/page.tsx`         | Initiatives — the 6 initiative categories & impact stats |
| `/activities`     | `app/(site)/activities/page.tsx`          | **Live** activities pulled from Firestore (published only) |
| `/blog`           | `app/(site)/blog/page.tsx`                | **Live** blog listing pulled from Firestore (published only) |
| `/blog/[id]`      | `app/(site)/blog/[id]/page.tsx`           | Single blog post |
| `/gallery`        | `app/(site)/gallery/page.tsx`             | Photo gallery |
| `/trust-deed`     | `app/(site)/trust-deed/page.tsx`          | Trust Deed — legal objects of the trust |
| `/membership`     | `app/(site)/membership/page.tsx`          | Membership drive — links out to the Google Form |
| `/contact`        | `app/(site)/contact/page.tsx`             | Contact Us — contact details, form, map |
| `/login`          | `app/login/page.tsx`                      | "Staff Login" — Firebase Auth sign-in for the admin |

Shared UI: `components/Navbar.tsx` (mobile menu + dropdown), `components/Footer.tsx`, `components/StatBar.tsx`, `components/SmoothScrollProvider.tsx` (Lenis, public site only), `components/Reveal.tsx`.

## Admin Portal — Firebase Auth, Firestore & Storage

`/admin` is a separate dashboard with its own sidebar shell (`components/AdminSidebar.tsx` + `app/admin/layout.tsx`), fully backed by Firebase:

| Route                | File                              | Description                                             |
|------------------------|------------------------------------|-----------------------------------------------------------|
| `/admin`               | `app/admin/page.tsx`               | Dashboard — stat cards + tabbed table of blog posts / activities, pulled live from Firestore |
| `/admin/blog`          | `app/admin/blog/page.tsx`          | Create/publish a blog post — image uploads go to Firebase Storage, content is saved to the `blogPosts` Firestore collection via `POST /api/blog` |
| `/admin/activities`    | `app/admin/activities/page.tsx`    | Create/publish an activity — same pattern, saves to the `activities` collection via `POST /api/activities` |

### How authentication works

This uses Firebase Auth (email/password) with a server-verified **session cookie**, not client-only auth — so protected pages never even render for a logged-out visitor:

1. **Sign in** (`app/login/page.tsx`): the browser calls `signInWithEmailAndPassword` directly against Firebase Auth, then sends the resulting ID token to `POST /api/auth/session`.
2. **Session cookie** (`app/api/auth/session/route.ts`): the server verifies that ID token with the Admin SDK, checks for an `admin: true` custom claim, and — only if present — mints a long-lived, `httpOnly` session cookie via `adminAuth().createSessionCookie()`.
3. **Two-layer route protection**:
   - `middleware.ts` (Edge runtime) does a cheap check — does the `session` cookie exist at all? If not, redirect to `/login` immediately. Edge can't run the Admin SDK, so this is presence-only, not verification.
   - `app/admin/layout.tsx` (Node.js runtime) does the real check — `getAdminSession()` (`lib/session.ts`) cryptographically verifies the cookie's signature, expiry, revocation status, *and* the `admin` claim via `adminAuth().verifySessionCookie()`. This is what actually gates access.
   - `app/api/blog/route.ts` and `app/api/activities/route.ts` independently call `getAdminSession()` again before allowing writes (or before returning drafts) — so the API can't be hit directly even if someone bypassed the page-level checks.
4. **No sign-up flow, by design** — there's exactly one admin account, provisioned via a script (below), not a public registration form.

### One-time setup

1. **Create a Firebase project** at [console.firebase.google.com](https://console.firebase.google.com) (free Spark plan is enough to start; Storage requires the Blaze pay-as-you-go plan, but has a generous free tier).
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Enable **Firestore Database** (production mode — the included `firestore.rules` locks out all client access anyway; only the server-side Admin SDK reads/writes).
4. Enable **Storage**.
5. Copy the env template and fill it in:
   ```bash
   cp .env.local .env.local
   ```
   - **Client config** (`NEXT_PUBLIC_FIREBASE_*`): Project Settings → General → Your apps → SDK setup and configuration.
   - **Admin config** (`FIREBASE_PROJECT_ID` / `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY`): Project Settings → Service Accounts → Generate new private key (downloads a JSON file — copy the three matching fields out of it). Keep `FIREBASE_PRIVATE_KEY` as one line with literal `\n` sequences, exactly as it appears in the JSON.
6. **Deploy the security rules** (or paste them into the Firebase Console → Firestore/Storage → Rules tabs):
   ```bash
   npm install -g firebase-tools   # if you don't have it
   firebase login
   firebase deploy --only firestore:rules,storage:rules
   ```
7. **Create the admin account** (sets email/password *and* the `admin` custom claim the whole system relies on):
   ```bash
   npm install
   npm run create-admin -- "admin@sarbojoninwelfare.org" "yourStrongPassword"
   ```
   Re-running this later with the same email updates the password; it's also how you'd promote a different account.
8. `npm run dev`, then sign in at `/login` (or the **Staff Login** button in the Navbar) with the email + password from step 7.

In production (e.g. Vercel), set the same environment variables in your host's dashboard — `FIREBASE_PRIVATE_KEY` especially needs to be pasted with the literal `\n`s intact (most hosts handle multi-line/escaped env values fine, but double-check after deploying).

### Data model (Firestore)

- **`blogPosts` collection** — `title`, `content`, `category`, `tags[]`, `status` (`"draft" | "published"`), `publishDate`, `featuredImage` (Storage URL or `null`), `videoUrl`, `views`, `createdAt`/`updatedAt` (server timestamps). Typed in `models/blog.ts`.
- **`activities` collection** — `name`, `startDate`, `scheduleDescription`, `description`, `category`, `tags[]`, `active`, `status`, `leadName`, `leadContact`, `media[]` (Storage URLs), `videoUrl`, `views`, `createdAt`/`updatedAt`. Typed in `models/activity.ts`.
- **Public vs. admin reads**: `GET /api/blog` and `GET /api/activities` return only `status: "published"` documents to unauthenticated callers, and everything (including drafts) to a verified admin session — see the route handlers for the exact logic.

### Images (Firebase Storage)

`lib/uploadImage.ts` uploads directly from the browser to Storage (under `blog/` or `activities/`), client-side validated (JPEG/PNG/WebP/GIF, ≤5MB) and server-enforced by `storage.rules` (same limits, plus requiring the `admin` custom claim to write at all). The resulting public download URL is what gets saved into the Firestore document — Next.js's `<Image>` component is already configured (`next.config.js`) to allow `firebasestorage.googleapis.com` as a remote image source.

### Security rules

- **`firestore.rules`** denies *all* client reads/writes — every Firestore access in this app goes through the Admin SDK on the server (in the API routes), which bypasses security rules entirely since it authenticates via service account, not a Firebase Auth user. There's no legitimate reason for the browser to talk to Firestore directly here.
- **`storage.rules`** allows public *read* of uploaded images (they're displayed on public pages) but restricts *write* to a signed-in user with the `admin` custom claim, within the size/type constraints.

## Branding

The real Sarbojonin logo (`public/images/logo.png`) is used in the public Navbar, Footer, the Admin sidebar, and the login page.

## Icons

All icons use [`react-icons`](https://react-icons.github.io/react-icons/) (`react-icons/fa` — Font Awesome set).

## Animation

- **Lenis** (`components/SmoothScrollProvider.tsx`) drives smooth scrolling on the public site only (mounted in `app/(site)/layout.tsx`) — the admin dashboard uses native scrolling, since dense forms are easier to work with that way.
- **Motion** (`motion/react`) handles scroll-reveal and hover animations throughout — fade/slide-in on scroll for public pages (each major section is `min-h-screen` so consecutive sections' `whileInView` triggers don't overlap and misfire), and load-in stagger + tactile hover/tap feedback on the admin pages (no scroll-reveal there, since forms are scanned top-to-bottom in one sitting, not scrolled through as a narrative).

## Images (static site imagery)

Non-CMS images live in `public/images/` (hero banner, event cards, avatars, etc.). Swap these out with your own official photography before going live.

## Getting Started

See **"One-time setup"** above for Firebase configuration — required before `/admin`, `/blog`, or `/activities` will work with real data. For just browsing the public site's static pages:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — custom theme (`maroon`, `forest`, `gold`, `cream`, `ink`) matching the brand palette
- **Firebase Auth** — admin sign-in, session cookies verified server-side
- **Firestore** (via `firebase-admin`, server-only) — blog posts & activities storage
- **Firebase Storage** — image uploads for blog/activity media
- **Motion** (`motion/react`) — scroll-reveal & hover animations
- **Lenis** — smooth scrolling (public site)
- **react-icons**
- Google Fonts: Playfair Display (headings) + Inter (body)
