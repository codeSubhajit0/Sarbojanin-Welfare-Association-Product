"use client";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaPlay, FaUsers } from "react-icons/fa";
import { motion } from "motion/react";
import StatBar from "@/components/StatBar";

import { initiatives, stats } from "@/constants/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function InitiativesPage() {
  return (
      <div>
        <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-16"
        >
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <motion.div
                variants={fadeLeft}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="section-eyebrow">Our Initiatives</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-4 text-ink leading-tight">
                Our Initiatives.{" "}
                <span className="text-maroon">Changing Lives.</span>
              </h1>
              <p className="text-ink/60 mt-5 leading-relaxed">
                In accordance with our Trust Deed, we undertake a wide range of
                charitable activities for the benefit of society irrespective of
                caste, creed, religion, language or gender.
              </p>
              <div className="flex flex-wrap gap-4 mt-7">
                <Link href="/programs" className="btn-primary">
                  <FaUsers size={14} /> Explore All Initiatives
                </Link>
                <Link href="/gallery" className="btn-outline">
                  <FaPlay size={12} /> Our Journey
                </Link>
              </div>
            </motion.div>

            <motion.div
                variants={fadeRight}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="grid grid-cols-2 gap-4"
            >
              <motion.div
                  transition={{ duration: 0.3 }}
                  className="relative row-span-2 rounded-2xl overflow-hidden shadow-md card-hover"
              >
                <Image
                    src="/images/plantation-drive.png"
                    alt="Students learning in a classroom"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-forest/95 text-white p-4">
                  <p className="font-serif font-semibold text-sm">
                    Every Tree Creates Life
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Rooted in purpose. Growing for a greener tomorrow.
                  </p>
                </div>
              </motion.div>
              <motion.div
                  transition={{ duration: 0.3 }}
                  className="relative h-32 rounded-2xl overflow-hidden shadow-md card-hover"
              >
                <Image
                    src="/images/elderly-health.jpg"
                    alt="Doctor caring for an elderly patient"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
              <motion.div
                  transition={{ duration: 0.3 }}
                  className="relative h-32 rounded-2xl overflow-hidden shadow-md card-hover"
              >
                <Image
                    src="/images/event-durgapuja.jpeg"
                    alt="Durga Puja Celebrations"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 pb-16"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {initiatives.map((it) => (
                <motion.div
                    key={it.title}
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white rounded-2xl p-6 border border-gold-light/20 shadow-sm card-hover"
                >
              <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${it.color}`}
              >
                <it.icon size={17} />
              </span>
                  <h3 className="font-serif font-semibold text-ink mb-2">
                    {it.title}
                  </h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{it.desc}</p>
                  <Link
                      href="/programs"
                      className="text-maroon text-sm font-semibold flex items-center gap-1.5 mt-4 transition-transform hover:translate-x-1"
                  >
                    Learn More <FaArrowRight size={11} />
                  </Link>
                </motion.div>
            ))}
          </div>

          <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="mt-14"
          >
            <StatBar stats={stats} />
          </motion.div>
        </motion.section>
      </div>
  );
}
