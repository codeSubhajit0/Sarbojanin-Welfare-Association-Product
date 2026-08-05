"use client";

import { Suspense, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      // 1. Sign in with Firebase Auth directly from the browser. This also
      //    persists the client-side auth session, which the create-blog /
      //    create-activity pages need later for authenticated Storage uploads.
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();

      // 2. Exchange the ID token for an httpOnly session cookie the server
      //    can verify on every request (middleware + admin layout + API routes).
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "This account is not authorized for admin access.");
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      const code = err?.code as string | undefined;
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        setError("Invalid email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please wait a moment and try again.");
      } else {
        setError(err?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
      console.log("Signing in with email:", email);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4f1] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-maroon mb-8"
        >
          <FaArrowLeft size={11} /> Back to website
        </Link>

        <div className="bg-white rounded-2xl border border-ink/5 shadow-sm p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="relative w-14 h-14 mb-4">
              <Image
                src="/images/logo.png"
                alt="Sarbojonin Welfare Association logo"
                fill
                className="object-contain"
              />
            </span>
            <h1 className="font-serif text-xl font-bold text-ink">
              Staff Login
            </h1>
            <p className="text-sm text-ink/50 mt-1">
              Sign in to manage blogs and activities.
            </p>
          </div>

          {error && (
            <div className="bg-maroon/5 border border-maroon/20 text-maroon text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-ink/70">
                Email
              </label>
              <div className="relative mt-1.5">
                <FaEnvelope
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
                  size={13}
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sarbojoninwelfare.org"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-ink/10 bg-[#f7f4f1] outline-none focus:border-maroon"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-ink/70">
                Password
              </label>
              <div className="relative mt-1.5">
                <FaLock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
                  size={13}
                />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-ink/10 bg-[#f7f4f1] outline-none focus:border-maroon"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-sm disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-ink/35 mt-6">
          This area is restricted to authorized Sarbojonin Welfare
          Association administrators.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
