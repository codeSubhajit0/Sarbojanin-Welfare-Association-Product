"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaUsers, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "/programs",
    label: "Our Programs",
    dropdown: [
      { href: "/programs#education", label: "Education & Scholarships" },
      { href: "/programs#healthcare", label: "Healthcare & Welfare" },
      { href: "/programs#culture", label: "Culture & Community" },
      { href: "/programs#social", label: "Social Development" },
    ],
  },
  { href: "/initiatives", label: "Initiatives" },
  { href: "/activities", label: "Activities" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/trust-deed", label: "Trust Deed" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [open]);

  // Also close the menu whenever the route changes (e.g. tapping a link).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
      <header className="sticky top-0 z-50 bg-cream backdrop-blur border-b border-gold-light/40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0">
          <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white p-0.5 shrink-0">
            <Image
                src="/images/logo.png"
                alt="Sarbojonin Welfare Association logo"
                width={48}
                height={48}
                className="object-contain p-1"
            />
          </span>
            <span className="flex flex-col leading-tight whitespace-nowrap">
            <span className="font-serif text-lg font-semibold text-maroon">
              Sarbojonin
            </span>
            <span className="text-[8px] tracking-[0.25em] text-forest font-semibold">
              WELFARE ASSOCIATION
            </span>
          </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-5 2xl:gap-8 flex-nowrap">
            {navLinks.map((link) =>
                link.dropdown ?
                    <div
                        key={link.href}
                        className="relative shrink-0"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button className="flex items-center gap-1 text-sm font-medium text-ink/80 hover:text-maroon transition-colors whitespace-nowrap">
                        {link.label}
                        <FaChevronDown size={10} />
                      </button>
                      {dropdownOpen && (
                          <div className="absolute top-full left-0 pt-3 w-64">
                            <div className="bg-white rounded-xl shadow-lg border border-gold-light/30 py-2">
                              {link.dropdown.map((item) => (
                                  <Link
                                      key={item.href}
                                      href={item.href}
                                      className="block px-4 py-2.5 text-sm text-ink/80 hover:bg-cream hover:text-maroon transition-colors"
                                  >
                                    {item.label}
                                  </Link>
                              ))}
                            </div>
                          </div>
                      )}
                    </div>
                    : <Link
                        key={link.href}
                        href={link.href}
                        className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                            pathname === link.href ?
                                "text-maroon"
                                : "text-ink/80 hover:text-maroon"
                        }`}
                    >
                      {link.label}
                    </Link>,
            )}
          </nav>

          <div className="hidden xl:block shrink-0">
            <Link href="/admin" className="btn-primary text-sm whitespace-nowrap">
              <FaUsers size={14} />
              Staff Login
            </Link>
          </div>

          <button
              className="xl:hidden text-ink shrink-0"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
          >
            {open ?
                <FaTimes size={22} />
                : <FaBars size={22} />}
          </button>
        </div>

        {open && (
            <div className="xl:hidden bg-cream border-t border-gold-light/40 px-6 py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-2.5 text-sm font-medium text-ink/80 hover:text-maroon"
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                        <div className="pl-4 border-l border-gold-light/50 ml-1 mb-2 space-y-1">
                          {link.dropdown.map((item) => (
                              <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-1.5 text-sm text-ink/60 hover:text-maroon"
                              >
                                {item.label}
                              </Link>
                          ))}
                        </div>
                    )}
                  </div>
              ))}

              <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="btn-primary text-sm w-full justify-center mt-6"
              >
                <FaUsers size={14} />
                Staff Login
              </Link>
            </div>
        )}
      </header>
  );
}
