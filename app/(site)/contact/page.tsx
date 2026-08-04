"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaPaperPlane,
  FaHandsHelping,
} from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

import { contactDetails,socials } from "@/constants/constants";


const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
      <div>
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="min-h-screen flex flex-col justify-center"
        >
          <motion.section
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center"
          >
          <span className="section-eyebrow justify-center">
            <FaHandsHelping className="inline mr-1" size={11} /> Get In Touch
          </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-4 text-ink">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-ink/60 mt-4 max-w-2xl mx-auto">
              Whether you want to volunteer, donate, partner with us, or simply
              learn more about our work, reach out and our team will get back to
              you soon.
            </p>
          </motion.section>

          <section className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-5 gap-10">

            <motion.div variants={fadeLeft} transition={{ duration: 0.7, ease: "easeOut" }} className="lg:col-span-2 space-y-4">
              {contactDetails.map((c, i) => (
                  <motion.div
                      key={c.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: "easeOut" }}

                      className="bg-white rounded-xl border border-gold-light/20 p-6 flex gap-5 card-hover"
                  >
                <span className="w-11 h-11 rounded-full bg-maroon/10 flex items-center justify-center text-maroon shrink-0">
                  <c.icon size={16} />
                </span>
                    <div>
                      <h3 className="font-serif font-semibold text-ink">{c.title}</h3>
                      {c.lines.map((line) => (
                          <p key={line} className="text-sm text-ink/60 mt-1">
                            {line}
                          </p>
                      ))}
                    </div>
                  </motion.div>
              ))}

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + contactDetails.length * 0.08, ease: "easeOut" }}
                  className="bg-forest text-white rounded-xl p-6"
              >
                <h3 className="font-serif font-semibold mb-3">Follow Our Journey</h3>
                <div className="flex gap-3">
                  {socials.map((s) => (
                      <motion.a
                          key={s.label}
                          href={s.href}
                          aria-label={s.label}

                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-forest flex items-center justify-center transition-colors"
                      >
                        <s.icon size={15} />
                      </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>


            <motion.div
                variants={fadeRight}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl border border-gold-light/20 p-8">
                <h2 className="font-serif text-xl font-bold text-ink mb-1">
                  Send Us a Message
                </h2>
                <p className="text-sm text-ink/50 mb-6">
                  Fill in the form below and we&apos;ll respond within 2 business days.
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                      <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="bg-cream border border-gold-light/40 rounded-xl p-8 text-center"
                      >
                        <p className="font-serif text-lg font-semibold text-forest">
                          Thank you for reaching out!
                        </p>
                        <p className="text-sm text-ink/60 mt-2">
                          Your message has been received. A member of our team will
                          contact you soon.
                        </p>
                      </motion.div>
                  ) : (
                      <motion.form
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          onSubmit={(e) => {
                            e.preventDefault();
                            setSubmitted(true);
                          }}
                          className="space-y-5"
                      >
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-medium text-ink/70">
                              Full Name
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="Your name"
                                className="mt-1.5 w-full rounded-lg border border-gold-light/40 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-maroon transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-ink/70">
                              Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="+91 00000 00000"
                                className="mt-1.5 w-full rounded-lg border border-gold-light/40 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-maroon transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-ink/70">
                            Email Address
                          </label>
                          <input
                              required
                              type="email"
                              placeholder="you@example.com"
                              className="mt-1.5 w-full rounded-lg border border-gold-light/40 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-maroon transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-ink/70">
                            I&apos;m interested in
                          </label>
                          <select className="mt-1.5 w-full rounded-lg border border-gold-light/40 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-maroon transition-colors">
                            <option>Volunteering</option>
                            <option>Donations & Support</option>
                            <option>Partnerships</option>
                            <option>General Inquiry</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-ink/70">
                            Message
                          </label>
                          <textarea
                              required
                              rows={5}
                              placeholder="Tell us how you'd like to get involved..."
                              className="mt-1.5 w-full rounded-lg border border-gold-light/40 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:border-maroon resize-none transition-colors"
                          />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="btn-primary w-full sm:w-auto justify-center"
                        >
                          <FaPaperPlane size={13} />
                          Send Message
                        </motion.button>
                      </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </section>
        </motion.div>

        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-6xl mx-auto px-6 pb-20"
        >
          <div className="rounded-2xl overflow-hidden border border-gold-light/20 h-80">
            <iframe
                title="Sarbojonin Welfare Association location"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.6471497793063!2d75.8166249750831!3d26.851172962733052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db612a4e04831%3A0xaec33991903c768f!2s8%2C%20Sector%201%2C%20Malviya%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302017!5e0!3m2!1sen!2sin!4v1784881185085!5m2!1sen!2sin"
            />
          </div>
        </motion.section>
      </div>
  );
}