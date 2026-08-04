"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSpinner,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "motion/react";
import type { Activity } from "@/models/activity";

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

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/activities")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load activities.");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setActivities(data.activities ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center"
      >
        <motion.span variants={fadeUp} transition={{ duration: 0.6 }} className="section-eyebrow justify-center">
          <FaCalendarCheck className="inline mr-1" size={11} /> What&apos;s Happening
        </motion.span>
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl font-bold mt-4 text-ink"
        >
          Our Activities
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-ink/60 mt-4 max-w-2xl mx-auto"
        >
          Ongoing and recurring programs run by our members — health camps,
          workshops, festivals, and community initiatives, all year round.
        </motion.p>
      </motion.section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-ink/40 text-sm py-24">
            <FaSpinner className="animate-spin" size={14} />
            Loading activities...
          </div>
        ) : error ? (
          <p className="text-center text-maroon text-sm py-24">{error}</p>
        ) : activities.length === 0 ? (
          <p className="text-center text-ink/40 text-sm py-24">
            No activities posted yet — check back soon.
          </p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden border border-gold-light/20 shadow-sm flex flex-col card-hover"
              >
                <div className="relative h-40 overflow-hidden bg-cream">
                  {activity.media[0] ? (
                    <Image
                      src={activity.media[0]}
                      alt={activity.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gold-light">
                      <FaUsers size={32} />
                    </div>
                  )}
                  {activity.active && (
                    <span className="absolute top-3 left-3 bg-forest text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-md flex items-center gap-1.5">
                      <FaCheckCircle size={9} /> Ongoing
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-white/90 text-ink text-[10px] font-semibold px-2.5 py-1.5 rounded-md">
                    {activity.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-serif font-semibold text-ink leading-snug">
                    {activity.name}
                  </h2>
                  {activity.scheduleDescription && (
                    <p className="text-xs text-maroon font-medium mt-1.5">
                      {activity.scheduleDescription}
                    </p>
                  )}
                  <p className="text-sm text-ink/60 mt-2 leading-relaxed flex-1">
                    {activity.description}
                  </p>

                  {activity.leadName && (
                    <div className="mt-4 pt-4 border-t border-gold-light/20 text-xs text-ink/50 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <FaMapMarkerAlt size={10} /> Led by {activity.leadName}
                      </p>
                      {activity.leadContact && (
                        <p className="flex items-center gap-1.5">
                          <FaPhoneAlt size={10} /> {activity.leadContact}
                        </p>
                      )}
                    </div>
                  )}

                  <Link
                    href="/contact"
                    className="text-maroon text-sm font-semibold flex items-center gap-1.5 mt-4 transition-transform hover:translate-x-1"
                  >
                    Get Involved →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
