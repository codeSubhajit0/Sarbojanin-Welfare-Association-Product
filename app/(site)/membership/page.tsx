"use client";

import {
  FaUsers,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaQuoteLeft,
  FaHeart,
  FaHome,
} from "react-icons/fa";
import { motion } from "motion/react";

import {GOOGLE_FORM_URL,benefits,signatories} from "@/constants/constants"


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function MembershipPage() {
  return (
      <div>
        <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center"
        >
          <motion.span variants={fadeUp} transition={{ duration: 0.6 }} className="section-eyebrow justify-center">
            <FaHome className="inline mr-1" size={11} /> Member Directory 2026
          </motion.span>
          <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl font-bold mt-4 text-ink leading-tight"
          >
            Bengal is Our Roots.{" "}
            <span className="text-maroon">Become Part of the Family.</span>
          </motion.h1>
          <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-ink/60 mt-5 leading-relaxed max-w-2xl mx-auto"
          >
            For many of us, Rajasthan is home — but Bengal will always be where
            our roots lie. Sarbojanin Welfare Association is not just about
            celebrating Durga Puja for five days. It is about keeping our
            Bengali culture, language, traditions, and community alive
            throughout all 365 days of the year.
          </motion.p>

          <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8"
          >
            <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-7 py-3.5"
            >
              <FaUsers size={16} />
              Join as a Member
              <FaExternalLinkAlt size={12} />
            </a>
            <p className="text-xs text-ink/40 mt-3">
              Opens our membership form on Google Forms
            </p>
          </motion.div>
        </motion.section>

        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-6 py-10"
        >
          <p className="text-ink/70 leading-relaxed">
            Through Durga Puja, Kali Puja, Saraswati Puja, Poila Boishakh,
            cultural programmes, social initiatives, and community gatherings,
            we bring Bengali families together and create a true home away from
            home. Most importantly, our children get the opportunity to
            experience our traditions, speak their mother tongue, and grow up
            connected to their heritage.
          </p>
          <p className="text-ink/70 leading-relaxed mt-4">
            For this purpose, SWA is in the process of making a member
            directory.
          </p>
        </motion.section>

        <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl mx-auto px-6 py-10"
        >
          <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-serif text-2xl font-bold text-ink mb-6"
          >
            Why Become a Member?
          </motion.h2>
          <div className="space-y-3">
            {benefits.map((b) => (
                <motion.div
                    key={b}
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{ x: 6 }}
                    className="bg-white rounded-xl border border-gold-light/20 p-5 flex items-start gap-4 card-hover"
                >
                  <FaCheckCircle className="text-forest mt-0.5 shrink-0" size={17} />
                  <p className="text-sm text-ink/75 leading-relaxed">{b}</p>
                </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-6 py-10"
        >
          <div className="bg-forest text-white rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center gap-6">
          <span className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <FaHeart className="text-gold" size={22} />
          </span>
            <div>
              <h3 className="font-serif text-lg font-semibold">
                Annual Membership Contribution: ₹500 per family
              </h3>
              <p className="text-sm text-white/75 mt-1.5 leading-relaxed">
                This is not merely a membership fee — it is your contribution
                towards preserving our culture, strengthening our community, and
                ensuring that future generations continue to celebrate their
                Bengali identity with pride.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-6 py-10 text-center"
        >
          <FaQuoteLeft className="text-gold-light mx-auto mb-4" size={24} />
          <p className="font-serif text-xl sm:text-2xl text-ink leading-snug max-w-2xl mx-auto">
            We inherited our Bengali culture from our parents. Let us ensure our
            children inherit it from us.
          </p>
          <p className="text-ink/60 mt-5 max-w-2xl mx-auto">
            Don&apos;t just celebrate with us for five days. Become a part of the
            family that keeps Bengali culture alive all 365 days of the year.
          </p>
          <p className="font-serif italic text-maroon mt-6">
            &ldquo;Become a member, build our community, preserve our
            culture.&rdquo;
          </p>
        </motion.section>

        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-6 pb-10"
        >
          <div className="border-t border-gold-light/30 pt-8 text-center">
            <p className="text-sm text-ink/60">With warm regards,</p>
            <p className="font-serif font-semibold text-ink mt-1">
              Sarbojanin Welfare Association
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 text-sm text-ink/70">
              {signatories.map((s) => (
                  <p key={s.name}>
                    <span className="font-medium text-ink">{s.name}</span>
                    <span className="text-ink/40"> — {s.role}</span>
                  </p>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-6 pb-20"
        >
          <div className="bg-maroon rounded-2xl px-8 py-10 text-center text-white">
            <h2 className="font-serif text-2xl font-bold">
              Ready to join the family?
            </h2>
            <p className="text-white/80 mt-3 max-w-xl mx-auto text-sm">
              Fill out our short membership form — it takes less than five
              minutes.
            </p>
            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block mt-6"
            >
              <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-light"
              >
                <FaUsers size={14} /> Open Membership Form{" "}
                <FaExternalLinkAlt size={11} />
              </a>
            </motion.div>
          </div>
        </motion.section>
      </div>
  );
}
