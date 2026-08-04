"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaGraduationCap,
  FaStethoscope,
  FaHandHoldingHeart,
  FaTheaterMasks,
  FaUsers,
  FaSeedling,
  FaHandsHelping,
  FaSearch,
  FaShieldAlt,
  FaUsersCog,
  FaBullseye,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

import { pillars, keypoints } from "@/constants/constants";



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
    transition: { staggerChildren: 0.1 },
  },
};

export default function AboutPage() {
  return (
      <div>
        <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start"
        >
          <motion.div
              variants={fadeLeft}
              transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="section-eyebrow">Why Join Us</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-4 text-ink leading-tight">
              Be a Part of Our Mission.{" "}
              <span className="text-maroon">Make a Lasting Impact.</span>
            </h1>
            <p className="text-ink/60 mt-5 leading-relaxed">
              Sarbojonin Welfare Association is a registered charitable trust
              formed for charitable purposes only. All our activities are
              undertaken for the benefit of society irrespective of caste, creed,
              religion, language or gender.
            </p>

            <div className="mt-6 flex items-start gap-3 bg-white border-l-4 border-gold rounded-r-lg px-5 py-4">
              <FaShieldAlt className="text-forest mt-0.5 shrink-0" size={18} />
              <p className="text-sm font-semibold text-ink leading-snug">
                A trust built on faith.
                <br />A mission driven by compassion.
              </p>
            </div>

            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-56 rounded-2xl overflow-hidden mt-6 shadow-md card-hover"
            >
              <Image
                  src="/images/distinguished-assembly.png"
                  alt="Volunteers joining hands together in unity"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          </motion.div>

          <motion.div
              variants={fadeRight}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="grid sm:grid-cols-2 gap-5"
          >
            <AnimatePresence initial={false}>
              {pillars.map((p, i) => (
                  <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + i * 0.06,
                        ease: "easeOut",
                      }}

                      className="bg-white rounded-2xl p-6 border border-gold-light/20 shadow-sm card-hover"
                  >
                <span
                    className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${p.color}`}
                >
                  <p.icon size={17} />
                </span>
                    <h3 className="font-serif font-semibold text-ink mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-ink/60 leading-relaxed">{p.desc}</p>
                  </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>


        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 pb-20"
        >
          <div className="rounded-2xl overflow-hidden grid md:grid-cols-[1fr_1.3fr] bg-forest">
            <div className="grid grid-cols-2 gap-6 p-10 text-white">
              <AnimatePresence initial={false}>
                {keypoints.map((s) => (
                    <div key={s.label}>
                      <s.icon className="text-gold mb-2" size={22} />
                      <p className="font-serif text-xl font-bold">{s.title}</p>
                      <p className="text-xs text-white/70 mt-1">{s.label}</p>
                    </div>
                ))}
              </AnimatePresence>
            </div>
            <div className="bg-cream rounded-2xl border border-forest p-10 flex flex-col justify-center">
              <h2 className="font-serif text-2xl font-bold text-ink">
                Your Time. Your Skills. Their Future.
              </h2>
              <p className="text-ink/60 mt-3 leading-relaxed text-sm">
                Join our community of volunteers, well-wishers and supporters who
                believe in building a better tomorrow through service, compassion
                and collective action.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link href="/contact" className="btn-primary">
                  <FaUsers size={14} /> Join Us Today <FaArrowRight size={12} />
                </Link>
                <Link href="/trust-deed" className="btn-outline">
                  <FaHeart size={14} /> Support Our Cause
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
  );
}
