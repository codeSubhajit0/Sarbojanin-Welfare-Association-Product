import Image from "next/image";
import { FaCamera } from "react-icons/fa";

import { photos } from "@/constants/constants";

export default function GalleryPage() {
  return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="section-eyebrow">
          <FaCamera className="inline mr-1" size={11} /> Gallery
        </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-4 text-ink">
            Moments From Our Journey
          </h1>
          <p className="text-ink/60 mt-4">
            A glimpse into our events, camps, festivals and everyday work across
            the communities we serve.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[160px] gap-4">
          {photos.map((p) => (
              <div
                  key={p.src}
                  className={`relative rounded-2xl overflow-hidden shadow-sm ${p.span ?? ""}`}
              >
                <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
          ))}
        </div>
      </div>
  );
}
