"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaPlus,
  FaRegFileAlt,
  FaRegEye,
  FaSearch,
  FaPen,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import type { BlogPost } from "@/models/blog";
import type { Activity } from "@/models/activity";

const categoryColors: Record<string, string> = {
  "Education & Scholarships": "bg-emerald-50 text-emerald-600",
  "Healthcare & Welfare": "bg-blue-50 text-blue-600",
  "Healthcare & Camps": "bg-blue-50 text-blue-600",
  "Culture & Community": "bg-purple-50 text-purple-600",
  "Social Development": "bg-amber-50 text-amber-700",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

type Row = {
  id: string;
  title: string;
  desc: string;
  category: string;
  status: string;
  date: string;
};

function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function excerpt(text: string, max = 70) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max)}…` : clean;
}

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<"blog" | "activities">("blog");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const [blogRes, activitiesRes] = await Promise.all([
          fetch("/api/blog"),
          fetch("/api/activities"),
        ]);

        if (!blogRes.ok || !activitiesRes.ok) {
          throw new Error("Failed to load dashboard data.");
        }

        const blogData = await blogRes.json();
        const activitiesData = await activitiesRes.json();

        if (!cancelled) {
          setPosts(blogData.posts ?? []);
          setActivities(activitiesData.activities ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const totalCount = posts.length + activities.length;
    const draftsCount =
        posts.filter((p) => p.status === "draft").length +
        activities.filter((a) => a.status === "draft").length;


    return [
      {
        label: "Total Posts & Activities",
        value: String(totalCount),
        note: `${posts.length} blog posts · ${activities.length} activities`,
        noteColor: "text-forest",
        icon: FaRegFileAlt,
        accent: "border-t-4 border-t-maroon",
        iconBg: "bg-blue-50 text-blue-500",
      },
      {
        label: "Drafts",
        value: String(draftsCount),
        note: draftsCount > 0 ? "Requires review" : "All caught up",
        noteColor: "text-ink/40",
        icon: FaRegFileAlt,
        accent: "border-t-4 border-t-forest",
        iconBg: "bg-amber-50 text-amber-600",
      },
    ];
  }, [posts, activities]);

  const rows: Row[] = useMemo(() => {
    const source: Row[] =
        tab === "blog"
            ? posts.map((p) => ({
              id: p.id,
              title: p.title,
              desc: excerpt(p.content),
              category: p.category,
              status: p.status,
              date: formatDate(p.publishDate || p.createdAt),
            }))
            : activities.map((a) => ({
              id: a.id,
              title: a.name,
              desc: excerpt(a.description),
              category: a.category,
              status: a.status,
              date: formatDate(a.startDate || a.createdAt),
            }));

    if (!search.trim()) return source;
    const q = search.trim().toLowerCase();
    return source.filter(
        (r) => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    );
  }, [tab, posts, activities, search]);

  return (
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div
            variants={fadeUp}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-between mb-8"
        >
          <h1 className="font-serif text-2xl font-bold text-ink">
            Content Management
          </h1>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link href="/admin/blog" className="btn-primary text-sm whitespace-nowrap">
              <FaPlus size={12} />
              Create New
            </Link>
          </motion.div>
        </motion.div>

        {error && (
            <p className="text-sm text-maroon bg-maroon/5 border border-maroon/20 rounded-lg px-4 py-3 mb-6">
              {error}
            </p>
        )}

        <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-3 gap-5 mb-8"
        >
          {stats.map((s) => (
              <motion.div
                  key={s.label}
                  variants={fadeUp}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className={`bg-white rounded-xl border border-ink/5 ${s.accent} p-5 card-hover`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm text-ink/50">{s.label}</p>
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.iconBg}`}>
                <s.icon size={14} />
              </span>
                </div>
                <p className="font-serif text-3xl font-bold text-ink mt-3">
                  {loading ? "—" : s.value}
                </p>
                <p className={`text-xs mt-1.5 font-medium ${s.noteColor}`}>
                  {s.note}
                </p>
              </motion.div>
          ))}
        </motion.div>

        <motion.div
            variants={fadeUp}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-xl border border-ink/5 p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-6 border-b border-ink/10 -mb-px">
              {(["blog", "activities"] as const).map((key) => (
                  <button
                      key={key}
                      onClick={() => setTab(key)}
                      className={`relative pb-3 text-sm font-semibold transition-colors ${
                          tab === key ? "text-maroon" : "text-ink/40 hover:text-ink/70"
                      }`}
                  >
                    {key === "blog" ? "Recent Blog Posts" : "Recent Activities"}
                    {tab === key && (
                        <motion.span
                            layoutId="tab-underline"
                            className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-maroon"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                    )}
                  </button>
              ))}
            </div>

            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/30" size={13} />
              <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search entries..."
                  className="pl-9 pr-4 py-2 text-sm rounded-lg border border-ink/10 bg-[#f7f4f1] outline-none focus:border-maroon w-56 transition-colors"
              />
            </div>
          </div>

          {loading ? (
              <div className="flex items-center justify-center gap-2 text-ink/40 text-sm py-16">
                <FaSpinner className="animate-spin" size={14} />
                Loading content...
              </div>
          ) : rows.length === 0 ? (
              <div className="text-center text-ink/40 text-sm py-16">
                {search
                    ? "No entries match your search."
                    : tab === "blog"
                        ? "No blog posts yet — create your first one."
                        : "No activities yet — create your first one."}
              </div>
          ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                    <tr className="text-left text-ink/40 text-xs uppercase tracking-wide">
                      <th className="pb-3 font-medium">Title</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5">
                    <AnimatePresence mode="wait">
                      {rows.map((r, i) => (
                          <motion.tr
                              key={`${tab}-${r.id}`}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25, delay: i * 0.04, ease: "easeOut" }}
                          >
                            <td className="py-3.5 pr-4">
                              <p className="font-medium text-ink">{r.title}</p>
                              <p className="text-ink/40 text-xs mt-0.5">{r.desc}</p>
                            </td>
                            <td className="py-3.5 pr-4">
                          <span
                              className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                                  categoryColors[r.category] ?? "bg-ink/5 text-ink/60"
                              }`}
                          >
                            {r.category}
                          </span>
                            </td>
                            <td className="py-3.5 pr-4">
                          <span
                              className={`inline-flex items-center gap-1.5 text-xs font-medium capitalize ${
                                  r.status === "published" ? "text-forest" : "text-ink/40"
                              }`}
                          >
                            <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                    r.status === "published" ? "bg-forest" : "bg-ink/30"
                                }`}
                            />
                            {r.status}
                          </span>
                            </td>
                            <td className="py-3.5 pr-4 text-ink/50">{r.date}</td>
                            <td className="py-3.5 text-right">
                              <Link
                                  href={`/admin/${tab}/${r.id}`}
                                  aria-label="Edit"
                                  className="w-8 h-8 rounded-lg hover:bg-cream text-maroon inline-flex items-center justify-center transition-colors"
                              >
                                <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <FaPen size={12} />
                                </motion.span>
                              </Link>
                            </td>
                          </motion.tr>
                      ))}
                    </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {/* Mobile card list */}
                <div className="md:hidden space-y-4">
                  <AnimatePresence mode="wait">
                    {rows.map((r, i) => (
                        <motion.div
                            key={`${tab}-${r.id}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.04 }}
                            className="rounded-xl border border-ink/10 bg-white p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-ink">{r.title}</h3>
                              <p className="text-xs text-ink/40 mt-1">{r.desc}</p>
                            </div>

                            <Link
                                href={`/admin/${tab}/${r.id}`}
                                aria-label="Edit"
                                className="w-8 h-8 rounded-lg hover:bg-cream text-maroon flex items-center justify-center shrink-0"
                            >
                              <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <FaPen size={12} />
                              </motion.span>
                            </Link>
                          </div>

                          <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-ink/50">Category</span>
                              <span
                                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                                      categoryColors[r.category] ?? "bg-ink/5 text-ink/60"
                                  }`}
                              >
                          {r.category}
                        </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-ink/50">Status</span>
                              <span
                                  className={`inline-flex items-center gap-1.5 text-xs font-medium capitalize ${
                                      r.status === "published" ? "text-forest" : "text-ink/40"
                                  }`}
                              >
                          <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                  r.status === "published" ? "bg-forest" : "bg-ink/30"
                              }`}
                          />
                                {r.status}
                        </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-ink/50">Date</span>
                              <span className="text-ink/70">{r.date}</span>
                            </div>
                          </div>
                        </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
          )}
        </motion.div>
      </motion.div>
  );
}