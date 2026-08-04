"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaUsers,
  FaLeaf,
  FaBookOpen,
  FaHeartbeat,
  FaMusic,
  FaHandsHelping,
  FaBalanceScaleLeft,
  FaHandHoldingHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import StatBar from "@/components/StatBar";

import LeadershipSection from "@/components/LeadershipSection";

import { motion } from "motion/react";

import {stats, events, features} from "@/constants/constants"

import {fadeUp, fadeLeft, fadeRight, staggerContainer} from "@/constants/animation"

export default function Home() {

  return (
      <div>

        <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center w-full">

            <motion.div
                variants={fadeLeft}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
            <span className="section-eyebrow mb-6">
              <FaShieldAlt className="text-maroon" size={12} />
              Registered Charitable Trust · Serving Since 2019
            </span>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mt-5 text-ink">
                Building a Better Society Through{" "}
                <span className="text-maroon">Service, Education</span> &{" "}
                <span className="text-maroon">Compassion</span>
              </h1>

              <p className="text-ink/70 mt-6 leading-relaxed max-w-xl">
                Sarbojonin Welfare Association is a registered charitable trust
                dedicated to advancing education, healthcare, social welfare,
                cultural development, and humanitarian service. Guided by
                equality, compassion, and community participation, we create
                meaningful opportunities for people from all walks of life.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="btn-primary">
                  <FaUsers size={14} />
                  Join Our Community
                </Link>

                <Link href="/initiatives" className="btn-outline">
                  <FaLeaf size={14} />
                  Explore Our Initiatives
                </Link>
              </div>
            </motion.div>


            <motion.div
                variants={fadeRight}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative h-[340px] rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                  src="/images/hero-banner.png"
                  alt="Community members, volunteers and children at a Sarbojonin Welfare Association event"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  priority
              />
            </motion.div>
          </div>


          <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-2 pb-16 w-full"
          >

            {features.map((f) => (
                <motion.div
                    key={f.title}
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: "easeOut" }}

                    className=" bg-white rounded-2xl p-6 shadow-sm border border-gold-light/20"
                >
              <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${f.color}`}
              >
                <f.icon size={18} />
              </span>

                  <h3 className="font-serif font-semibold text-ink mb-2">
                    {f.title}
                  </h3>

                  <p className="text-sm text-ink/60 leading-relaxed">{f.desc}</p>

                  <div className={`h-1 w-10 rounded-full mt-4 ${f.bar}`} />
                </motion.div>
            ))}

          </motion.div>


          <div className="max-w-7xl mx-auto px-6 pb-20 w-full">
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="bg-forest rounded-2xl px-8 py-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-10 text-white"
            >
              <div className="flex items-center gap-4 shrink-0">
              <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-maroon">
                <FaHandHoldingHeart size={20} />
              </span>

                <p className="text-sm text-white/90 max-w-xs">
                  Dedicated to education, healthcare, social welfare, cultural
                  harmony, and community development for the benefit of society.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1">
                {[
                  { icon: FaBalanceScaleLeft, label: "Equality & Inclusion" },
                  { icon: FaHandHoldingHeart, label: "Compassion & Humanity" },
                  { icon: FaUsers, label: "Community Participation" },
                  { icon: FaHandsHelping, label: "Service Before Self" },
                ].map((v) => (
                    <div key={v.label} className="flex items-center gap-2.5">
                      <v.icon className="text-gold shrink-0" size={18} />
                      <span className="text-xs text-white/85 leading-snug">
                    {v.label}
                  </span>
                    </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-16"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-eyebrow">
            Our Upcoming Events & Initiatives
          </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-4 text-ink">
              Together in Action, Building a Better Tomorrow
            </h2>

            <p className="text-ink/60 mt-4">
              From cultural celebrations to educational drives and welfare
              programs, our events unite people and create positive change.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((e) => (
                <motion.div
                    key={e.title}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl overflow-hidden border border-gold-light/20 shadow-sm flex flex-col card-hover"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                        src={e.image}
                        alt={e.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 hover:scale-110"
                    />

                    <span className="absolute top-3 left-3 bg-forest text-white text-xs font-semibold px-2.5 py-1.5 rounded-md leading-tight">
                  {e.date}
                </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                <span
                    className={`text-[10px] font-semibold tracking-wide px-2 py-1 rounded w-fit ${e.tagColor}`}
                >
                  {e.tag}
                </span>

                    <h3 className="font-serif font-semibold mt-3 text-ink">
                      {e.title}
                    </h3>

                    <p className="text-sm text-ink/60 mt-2 leading-relaxed flex-1">
                      {e.desc}
                    </p>

                    <p className="text-xs text-ink/50 flex items-center gap-1.5 mt-4">
                      <FaMapMarkerAlt size={11} />
                      {e.place}
                    </p>

                    <Link
                        href="/contact"
                        className="text-maroon text-sm font-semibold flex items-center gap-1.5 mt-3"
                    >
                      {e.cta}
                      <FaArrowRight size={11} />
                    </Link>
                  </div>
                </motion.div>
            ))}

          </div>
        </motion.section>

        <div className="max-w-7xl mx-auto px-6">
          <StatBar stats={stats} />
          <LeadershipSection />
        </div>
      </div>
  );
}