"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import {
  FaThLarge,
  FaBlog,
  FaRegCalendarCheck,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FaThLarge },
  { href: "/admin/blog", label: "Blog", icon: FaBlog },
  { href: "/admin/activities", label: "Activities", icon: FaRegCalendarCheck },
];

export default function AdminSidebar({
                                       adminEmail,
                                       onNavigate,
                                     }: {
  adminEmail: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const initials = adminEmail?.[0]?.toUpperCase() ?? "A";

  const handleSignOut = async () => {
    // Clear the server-side session cookie first (so a stale tab can't
    // keep using it), then sign out of the Firebase client SDK, then leave.
    await fetch("/api/auth/session", { method: "DELETE" }).catch(() => {});
    await firebaseSignOut(auth).catch(() => {});
    onNavigate?.();
    router.push("/");
    router.refresh();
  };

  return (
      <aside className="w-64 h-screen shrink-0 bg-[#fbeee7] border-r border-maroon/10 flex flex-col overflow-y-auto">
        <div className="px-6 pt-6 pb-5 flex items-center gap-3">
        <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white p-1.5 shrink-0">
          <Image
              src="/images/logo.png"
              alt="Sarbojonin Welfare Association logo"
              width={44}
              height={44}
              className="object-contain p-1"
          />
        </span>
          <div className="leading-tight">
            <p className="font-serif font-bold text-maroon text-[15px]">
              Admin Portal
            </p>
            <p className="text-[10px] tracking-[0.2em] text-ink/40 font-semibold">
              WELFARE
            </p>
          </div>
        </div>

        <div className="mx-4 mb-5 flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-maroon/10">
        <span className="w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center text-maroon text-xs font-semibold shrink-0">
          {initials}
        </span>
          <span className="text-sm font-medium text-ink/80 truncate">
          {adminEmail}
        </span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const active =
                item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
            return (
                <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                            ? "bg-white text-maroon border-l-4 border-maroon shadow-sm"
                            : "text-ink/60 hover:bg-white/60 hover:text-maroon border-l-4 border-transparent"
                    }`}
                >
                  <item.icon size={15} />
                  {item.label}
                </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-6 pt-4 border-t border-maroon/10">
          <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink/60 hover:bg-white/60 hover:text-maroon transition-colors"
          >
            <FaSignOutAlt size={15} />
            Sign Out
          </button>
        </div>
      </aside>
  );
}