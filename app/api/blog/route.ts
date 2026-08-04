import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { getAdminSession } from "@/lib/session";
import type { BlogPost, BlogPostInput } from "@/models/blog";

export const runtime = "nodejs";

const COLLECTION = "blogPosts";

/**
 * GET /api/blog
 * - Public (no session): returns only status="published" posts. This is
 *   what the public /blog page fetches.
 * - Authenticated admin: returns everything (drafts included), which is
 *   what the admin dashboard's "Recent Blog Posts" table fetches. Passing
 *   ?status=... is only honored for admins — an unauthenticated caller
 *   can't use it to peek at drafts.
 */
export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  const statusParam = req.nextUrl.searchParams.get("status");

  let query: FirebaseFirestore.Query = adminDb().collection(COLLECTION);

  if (!session) {
    query = query.where("status", "==", "published");
  } else if (statusParam === "draft" || statusParam === "published") {
    query = query.where("status", "==", statusParam);
  }

  const snapshot = await query.orderBy("createdAt", "desc").get();
  const posts: BlogPost[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
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
  });

  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: BlogPostInput = await req.json();
  const { title, content, category, tags, publishDate, featuredImage, videoUrl, status } = body;

  if (!title || !content || !category) {
    return NextResponse.json(
      { error: "Title, content, and category are required." },
      { status: 400 }
    );
  }

  const now = FieldValue.serverTimestamp();
  const docRef = await adminDb()
    .collection(COLLECTION)
    .add({
      title,
      content,
      category,
      tags: Array.isArray(tags) ? tags : [],
      status: status === "draft" ? "draft" : "published",
      publishDate: publishDate || new Date().toISOString(),
      featuredImage: featuredImage ?? null,
      videoUrl: videoUrl ?? null,
      views: 0,
      createdAt: now,
      updatedAt: now,
    });

  const created = await docRef.get();
  return NextResponse.json({ id: docRef.id, ...created.data() }, { status: 201 });
}
