import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { getAdminSession } from "@/lib/session";
import type { Activity, ActivityInput } from "@/models/activity";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const doc = await adminDb().collection("activities").doc(params.id).get();

  if (!doc.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data = doc.data()!;

  // Unpublished activities are only visible to a verified admin session.
  if (data.status !== "published") {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  const activity: Activity = {
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

  return NextResponse.json({ activity });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const docRef = adminDb().collection("activities").doc(params.id);
  const existing = await docRef.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body: Partial<ActivityInput> = await req.json();
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

  if (name !== undefined && !name.trim()) {
    return NextResponse.json({ error: "Activity name cannot be empty." }, { status: 400 });
  }
  if (description !== undefined && !description.trim()) {
    return NextResponse.json({ error: "Description cannot be empty." }, { status: 400 });
  }
  if (category !== undefined && !category) {
    return NextResponse.json({ error: "Category cannot be empty." }, { status: 400 });
  }

  const updates: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };
  if (name !== undefined) updates.name = name;
  if (startDate !== undefined) updates.startDate = startDate;
  if (scheduleDescription !== undefined) updates.scheduleDescription = scheduleDescription;
  if (description !== undefined) updates.description = description;
  if (category !== undefined) updates.category = category;
  if (tags !== undefined) updates.tags = Array.isArray(tags) ? tags : [];
  if (active !== undefined) updates.active = active;
  if (status !== undefined) updates.status = status === "draft" ? "draft" : "published";
  if (leadName !== undefined) updates.leadName = leadName;
  if (leadContact !== undefined) updates.leadContact = leadContact;
  if (media !== undefined) updates.media = Array.isArray(media) ? media : [];
  if (videoUrl !== undefined) updates.videoUrl = videoUrl;

  await docRef.update(updates);
  const updated = await docRef.get();
  return NextResponse.json({ id: docRef.id, ...updated.data() });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const docRef = adminDb().collection("activities").doc(params.id);
  const existing = await docRef.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await docRef.delete();
  return NextResponse.json({ success: true });
}
