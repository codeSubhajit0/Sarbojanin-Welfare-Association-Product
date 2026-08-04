"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaCalendarAlt, FaSpinner, FaNewspaper } from "react-icons/fa";
import { motion } from "motion/react";
import type { BlogPost } from "@/models/blog";

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

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function excerpt(text: string, max = 140) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max)}…` : clean;
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blog")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load blog posts.");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setPosts(data.posts ?? []);
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
          <FaNewspaper className="inline mr-1" size={11} /> Stories & Updates
        </motion.span>
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl font-bold mt-4 text-ink"
        >
          Our Blog
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-ink/60 mt-4 max-w-2xl mx-auto"
        >
          Updates from our schools, health camps, festivals, and the
          communities we serve — written by the people doing the work.
        </motion.p>
      </motion.section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-ink/40 text-sm py-24">
            <FaSpinner className="animate-spin" size={14} />
            Loading posts...
          </div>
        ) : error ? (
          <p className="text-center text-maroon text-sm py-24">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-ink/40 text-sm py-24">
            No blog posts yet — check back soon.
          </p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden border border-gold-light/20 shadow-sm flex flex-col card-hover"
              >
                <Link href={`/blog/${post.id}`} className="relative h-44 overflow-hidden block bg-cream">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gold-light">
                      <FaNewspaper size={32} />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-forest text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-md">
                    {post.category}
                  </span>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-ink/40 flex items-center gap-1.5">
                    <FaCalendarAlt size={10} />
                    {formatDate(post.publishDate)}
                  </p>
                  <h2 className="font-serif font-semibold text-ink mt-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-ink/60 mt-2 leading-relaxed flex-1">
                    {excerpt(post.content)}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-maroon text-sm font-semibold flex items-center gap-1.5 mt-4 transition-transform hover:translate-x-1"
                  >
                    Read More <FaArrowRight size={11} />
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
