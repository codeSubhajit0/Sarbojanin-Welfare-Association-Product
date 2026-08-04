import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { getAdminSession } from "@/lib/session";
import type { BlogPost, BlogPostInput } from "@/models/blog";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const doc = await adminDb().collection("blogPosts").doc(params.id).get();

  if (!doc.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data = doc.data()!;

  // Unpublished posts are only visible to a verified admin session.
  if (data.status !== "published") {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  const post: BlogPost = {
    id: doc.id,
    title: data.title,
    content: data.content,
    category: data.category,
    tags: data.tags ?? [],
    status: data.status,
    publishDate: data.publishDate,
    featuredImage: data.featuredImage ?? null,
    videoUrl: data.videoUrl ?? null,
    views: data.views ?? 0,
    createdAt: data.createdAt?.toDate?.().toISOString?.() ?? data.createdAt ?? null,
    updatedAt: data.updatedAt?.toDate?.().toISOString?.() ?? data.updatedAt ?? null,
  };

  return NextResponse.json({ post });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const docRef = adminDb().collection("blogPosts").doc(params.id);
  const existing = await docRef.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body: Partial<BlogPostInput> = await req.json();
  const { title, content, category, tags, publishDate, featuredImage, videoUrl, status } = body;

  if (title !== undefined && !title.trim()) {
    return NextResponse.json({ error: "Title cannot be empty." }, { status: 400 });
  }
  if (content !== undefined && !content.trim()) {
    return NextResponse.json({ error: "Content cannot be empty." }, { status: 400 });
  }
  if (category !== undefined && !category) {
    return NextResponse.json({ error: "Category cannot be empty." }, { status: 400 });
  }

  const updates: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };
  if (title !== undefined) updates.title = title;
  if (content !== undefined) updates.content = content;
  if (category !== undefined) updates.category = category;
  if (tags !== undefined) updates.tags = Array.isArray(tags) ? tags : [];
  if (publishDate !== undefined) updates.publishDate = publishDate;
  if (featuredImage !== undefined) updates.featuredImage = featuredImage;
  if (videoUrl !== undefined) updates.videoUrl = videoUrl;
  if (status !== undefined) updates.status = status === "draft" ? "draft" : "published";

  await docRef.update(updates);
  const updated = await docRef.get();
  return NextResponse.json({ id: docRef.id, ...updated.data() });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const docRef = adminDb().collection("blogPosts").doc(params.id);
  const existing = await docRef.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await docRef.delete();
  return NextResponse.json({ success: true });
}
