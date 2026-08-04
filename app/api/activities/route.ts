import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { getAdminSession } from "@/lib/session";
import type { Activity, ActivityInput } from "@/models/activity";

export const runtime = "nodejs";

const COLLECTION = "activities";

/**
 * GET /api/activities — same public/admin split as /api/blog:
 * unauthenticated callers only ever see status="published" activities.
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
  const activities: Activity[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      startDate: data.startDate ?? null,
      scheduleDescription: data.scheduleDescription ?? "",
      description: data.description,
      category: data.category,
      tags: data.tags ?? [],
      active: data.active ?? true,
      status: data.status,
      leadName: data.leadName ?? "",
      leadContact: data.leadContact ?? "",
      media: data.media ?? [],
      videoUrl: data.videoUrl ?? null,
      views: data.views ?? 0,
      createdAt: data.createdAt?.toDate?.().toISOString?.() ?? data.createdAt ?? null,
      updatedAt: data.updatedAt?.toDate?.().toISOString?.() ?? data.updatedAt ?? null,
    };
  });

  return NextResponse.json({ activities });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: ActivityInput = await req.json();
  const {
    name,
    startDate,
    scheduleDescription,
    description,
    category,
    tags,
    active,
    status,
    leadName,
    leadContact,
    media,
    videoUrl,
  } = body;

  if (!name || !description || !category) {
    return NextResponse.json(
      { error: "Activity name, description, and category are required." },
      { status: 400 }
    );
  }

  const now = FieldValue.serverTimestamp();
  const docRef = await adminDb()
    .collection(COLLECTION)
    .add({
      name,
      startDate: startDate ?? null,
      scheduleDescription: scheduleDescription ?? "",
      description,
      category,
      tags: Array.isArray(tags) ? tags : [],
      active: active ?? true,
      status: status === "draft" ? "draft" : "published",
      leadName: leadName ?? "",
      leadContact: leadContact ?? "",
      media: Array.isArray(media) ? media : [],
      videoUrl: videoUrl ?? null,
      views: 0,
      createdAt: now,
      updatedAt: now,
    });

  const created = await docRef.get();
  return NextResponse.json({ id: docRef.id, ...created.data() }, { status: 201 });
}
