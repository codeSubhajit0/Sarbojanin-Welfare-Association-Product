import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
      <footer className="bg-forest text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-5">
          <div>
            <div className="flex items-center gap-3 mb-4">
            <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white p-1.5 shrink-0">
              <Image
                  src="/images/logo.png"
                  alt="Sarbojonin Welfare Association logo"
                  width={44}
                  height={44}
                  className="object-contain p-1"
              />
            </span>
              <span className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-semibold text-white">
                Sarbojonin
              </span>
              <span className="text-[10px] tracking-[0.25em] text-white font-semibold">
                WELFARE ASSOCIATION
              </span>
            </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              A registered charitable trust dedicated to advancing education,
              healthcare, social welfare, cultural development, and humanitarian
              service since 2019.
            </p>
            <div className="flex gap-3 mt-5">
              {[FaFacebookF, FaInstagram, FaYoutube].map((Icon, i) => (
                  <a
                      key={i}
                      href="#"
                      className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors"
                  >
                    <Icon size={14} />
                  </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-gold">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-gold">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/initiatives" className="hover:text-gold">
                  Initiatives
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/trust-deed" className="hover:text-gold">
                  Trust Deed
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base font-semibold mb-4">
              Our Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/programs#education" className="hover:text-gold">
                  Education & Scholarships
                </Link>
              </li>
              <li>
                <Link href="/programs#healthcare" className="hover:text-gold">
                  Healthcare & Welfare
                </Link>
              </li>
              <li>
                <Link href="/programs#culture" className="hover:text-gold">
                  Culture & Community
                </Link>
              </li>
              <li>
                <Link href="/programs#social" className="hover:text-gold">
                  Social Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base font-semibold mb-4">
              Registration Details
            </h4>

            <ul className="space-y-4 text-sm text-white/70">
              <li>
                <p className="text-white font-medium uppercase tracking-wider text-xs">
                  DARPAN ID
                </p>
                <p className="mt-1 break-all">
                  RJ/2025/0765297
                </p>
              </li>

              <li>
                <p className="text-white font-medium uppercase tracking-wider text-xs">
                  SAN
                </p>
                <p className="mt-1 break-all">
                  8005220120000186
                </p>
              </li>

              <li>
                <p className="text-white font-medium uppercase tracking-wider text-xs">
                  UDYAM Registration
                </p>
                <p className="mt-1 break-all">
                  UDYAM-RJ-17-0662559
                </p>
              </li>

              <li className="pt-2">
                <Link
                    href="/trust-deed"
                    className="inline-flex items-center text-gold hover:underline"
                >
                  View Trust Deed →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base font-semibold mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="mt-1 text-gold shrink-0" size={13} />
                SN-1 NEAR MAHIMA,OPPOSITE ROYAL PLATINA VIT ROAD JAGATPURA, JAIPUR
                302017,<br/>
                8/77,MALVIYA NAGAR JAIPUR
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-gold shrink-0" size={13} />
                +91 9414321177
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="text-gold shrink-0" size={13} />
                sarbojanin4all@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <p>
              &copy; {new Date().getFullYear()} Sarbojanin Welfare Association.
              Registered Charitable Trust, Estd. 2019.
            </p>
            <p>
              All activities undertaken for the benefit of society irrespective of
              caste, creed, religion, language or gender.
            </p>
            <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-maroon transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </footer>
  );
}
