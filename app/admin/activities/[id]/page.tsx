"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import ActivityForm from "@/components/ActivityForm";
import type { Activity } from "@/models/activity";

export default function EditActivityPage({ params }: { params: { id: string } }) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/activities/${params.id}`);
        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "This activity no longer exists."
              : "Failed to load the activity."
          );
        }
        const data = await res.json();
        if (!cancelled) setActivity(data.activity);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-ink/40 text-sm py-24">
        <FaSpinner className="animate-spin" size={14} />
        Loading activity...
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="max-w-2xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-maroon font-medium mb-6 hover:underline"
        >
          <FaArrowLeft size={11} /> Back to Dashboard
        </Link>
        <p className="text-sm text-maroon bg-maroon/5 border border-maroon/20 rounded-lg px-4 py-3">
          {error || "This activity could not be found."}
        </p>
      </div>
    );
  }

  return <ActivityForm mode="edit" activityId={activity.id} initial={activity} />;
}
