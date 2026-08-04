"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaBold,
  FaItalic,
  FaListUl,
  FaLink,
  FaImage,
  FaCloudUploadAlt,
  FaTimes,
  FaSpinner,
  FaTrashAlt,
} from "react-icons/fa";
import { uploadImage } from "@/lib/uploadImage";
import type { BlogPost } from "@/models/blog";

type Props =
  | { mode: "create"; postId?: undefined; initial?: undefined }
  | { mode: "edit"; postId: string; initial: BlogPost };

export default function BlogForm(props: Props) {
  const { mode } = props;
  const initial = mode === "edit" ? props.initial : undefined;
  const router = useRouter();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [publishDate, setPublishDate] = useState(
    initial?.publishDate ? initial.publishDate.slice(0, 10) : ""
  );
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(
    initial?.featuredImage ?? null
  );
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const addTag = () => {
    const value = tagInput.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
    setTagInput("");
  };

  const removeTag = (t: string) => setTags(tags.filter((tag) => tag !== t));

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    setError("");
    setUploading(true);
    try {
      const url = await uploadImage(file, "blog");
      setFeaturedImage(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (status: "published" | "draft") => {
    setError("");

    if (!title.trim() || !content.trim() || !category) {
      setError("Please fill in the blog title, content, and category.");
      return;
    }

    setSubmitting(true);
    try {
      const url = mode === "edit" ? `/api/blog/${props.postId}` : "/api/blog";
      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          category,
          tags,
          status,
          publishDate: publishDate || undefined,
          videoUrl: videoUrl || undefined,
          featuredImage,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || `Failed to ${mode === "edit" ? "update" : "post"} the blog.`
        );
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (mode !== "edit") return;
    if (!confirm(`Delete "${title || "this post"}"? This can't be undone.`)) return;

    setError("");
    setDeleting(true);
    try {
      const res = await fetch(`/api/blog/${props.postId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete the post.");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-maroon font-medium mb-4 hover:underline"
      >
        <FaArrowLeft size={11} /> Back to Blog
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">
            {mode === "edit" ? "Edit Blog Post" : "Create New Blog"}
          </h1>
          <p className="text-sm text-ink/50 mt-1">
            {mode === "edit"
              ? "Update the details below and save your changes."
              : "Design and publish community welfare programs with ease."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {mode === "edit" && (
            <button
              onClick={handleDelete}
              disabled={submitting || uploading || deleting}
              className="inline-flex items-center gap-2 text-sm font-medium text-maroon border border-maroon/20 rounded-lg px-4 py-2 hover:bg-maroon/5 transition-colors disabled:opacity-60"
            >
              <FaTrashAlt size={11} />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          )}
          <Link href="/admin" className="btn-outline text-sm">
            Cancel
          </Link>
          <button
            onClick={() => submit("draft")}
            disabled={submitting || uploading || deleting}
            className="btn-outline text-sm disabled:opacity-60"
          >
            Save as Draft
          </button>
          <button
            onClick={() => submit("published")}
            disabled={submitting || uploading || deleting}
            className="btn-primary text-sm disabled:opacity-60"
          >
            {submitting
              ? mode === "edit"
                ? "Saving..."
                : "Posting..."
              : mode === "edit"
              ? "Save Changes"
              : "Post Blog"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-maroon bg-maroon/5 border border-maroon/20 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-ink/5 p-6">
            <h2 className="font-serif font-semibold text-ink mb-5">
              Core Details
            </h2>

            <label className="text-sm font-medium text-ink/70">
              Blog Title <span className="text-maroon">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title"
              className="mt-1.5 w-full rounded-lg border border-ink/10 bg-[#f7f4f1] px-4 py-2.5 text-sm outline-none focus:border-maroon"
            />

            <label className="text-sm font-medium text-ink/70 mt-5 block">
              Detailed Content <span className="text-maroon">*</span>
            </label>
            <div className="mt-1.5 rounded-lg border border-ink/10 overflow-hidden">
              <div className="flex items-center gap-3 px-3 py-2 bg-[#f7f4f1] border-b border-ink/10 text-ink/50">
                <FaBold size={12} className="cursor-pointer hover:text-maroon" />
                <FaItalic size={12} className="cursor-pointer hover:text-maroon" />
                <FaListUl size={12} className="cursor-pointer hover:text-maroon" />
                <FaLink size={12} className="cursor-pointer hover:text-maroon" />
                <FaImage size={12} className="cursor-pointer hover:text-maroon" />
              </div>
              <textarea
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the full story here..."
                className="w-full px-4 py-3 text-sm outline-none resize-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-ink/5 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif font-semibold text-ink">Featured Image</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              <label
                className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-ink/40 transition-colors ${
                  uploading
                    ? "border-ink/10 cursor-wait"
                    : "border-ink/15 cursor-pointer hover:border-maroon hover:text-maroon"
                }`}
              >
                {uploading ? (
                  <FaSpinner className="animate-spin" size={18} />
                ) : (
                  <>
                    <FaCloudUploadAlt size={20} />
                    <span className="text-[11px] mt-1.5">
                      {featuredImage ? "Replace Image" : "Upload Image"}
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={handleImageSelect}
                />
              </label>

              {featuredImage && (
                <div className="relative aspect-square rounded-lg overflow-hidden group">
                  <Image
                    src={featuredImage}
                    alt="Featured image preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFeaturedImage(null)}
                    aria-label="Remove featured image"
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTimes size={10} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-[11px] text-ink/35 mt-3">
              Uploaded to Firebase Storage. JPEG/PNG/WebP/GIF, up to 5MB.
            </p>

            <label className="text-sm font-medium text-ink/70 mt-6 block">
              Featured Video URL (Optional)
            </label>
            <div className="mt-1.5 flex gap-3">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/..."
                className="flex-1 rounded-lg border border-ink/10 bg-[#f7f4f1] px-4 py-2.5 text-sm outline-none focus:border-maroon"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-ink/5 p-6">
            <h2 className="font-serif font-semibold text-ink mb-5">Settings</h2>

            <label className="text-sm font-medium text-ink/70">
              Publish Date
            </label>
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-ink/10 bg-[#f7f4f1] px-4 py-2.5 text-sm outline-none focus:border-maroon"
            />

            <label className="text-sm font-medium text-ink/70 mt-5 block">
              Category <span className="text-maroon">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-ink/10 bg-[#f7f4f1] px-4 py-2.5 text-sm outline-none focus:border-maroon"
            >
              <option value="">Select a category</option>
              <option>Education & Scholarships</option>
              <option>Healthcare & Welfare</option>
              <option>Culture & Community</option>
              <option>Social Development</option>
            </select>

            <label className="text-sm font-medium text-ink/70 mt-5 block">
              Tags
            </label>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 rounded-lg border border-ink/10 bg-[#f7f4f1] px-3 py-2.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 bg-maroon/10 text-maroon text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {t}
                  <button onClick={() => removeTag(t)} aria-label={`Remove ${t}`}>
                    <FaTimes size={9} />
                  </button>
                </span>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add tag..."
                className="flex-1 min-w-[80px] bg-transparent text-sm outline-none"
              />
            </div>
            <p className="text-[11px] text-ink/35 mt-1.5">
              Press enter to add a tag.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
