"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaCalendarAlt, FaSpinner, FaTag } from "react-icons/fa";
import { motion } from "motion/react";
import type { BlogPost } from "@/models/blog";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPostPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/blog/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? "Post not found." : "Failed to load post.");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setPost(data.post);
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
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-ink/40 text-sm py-32">
        <FaSpinner className="animate-spin" size={14} />
        Loading post...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <p className="text-ink/60">{error || "Post not found."}</p>
        <Link href="/blog" className="text-maroon font-semibold mt-4 inline-block hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto px-6 pt-16 pb-24"
    >
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-maroon font-medium mb-8 hover:underline"
      >
        <FaArrowLeft size={11} /> Back to Blog
      </Link>

      <span className="section-eyebrow">{post.category}</span>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-4 text-ink leading-tight">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-ink/50">
        <span className="flex items-center gap-1.5">
          <FaCalendarAlt size={11} /> {formatDate(post.publishDate)}
        </span>
        {post.tags.length > 0 && (
          <span className="flex items-center gap-1.5 flex-wrap">
            <FaTag size={11} />
            {post.tags.join(", ")}
          </span>
        )}
      </div>

      {post.featuredImage && (
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mt-8 shadow-md">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <div className="max-w-none mt-8 text-ink/75 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      {post.videoUrl && (
        <div className="mt-8">
          <p className="text-sm font-medium text-ink/70 mb-2">Watch:</p>
          <a
            href={post.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon font-semibold hover:underline break-all"
          >
            {post.videoUrl}
          </a>
        </div>
      )}
    </motion.article>
  );
}
