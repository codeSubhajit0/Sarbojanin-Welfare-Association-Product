export type ActivityStatus = "draft" | "published";

export interface Activity {
  id: string;
  name: string;
  startDate: string | null; // ISO date string
  scheduleDescription: string;
  description: string;
  category: string;
  tags: string[];
  active: boolean;
  status: ActivityStatus;
  leadName: string;
  leadContact: string;
  media: string[]; // Firebase Storage download URLs
  videoUrl: string | null;
  views: number;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

/** Shape accepted from the "Create Ongoing Activity" form / POST /api/activities body. */
export interface ActivityInput {
  name: string;
  startDate?: string | null;
  scheduleDescription?: string;
  description: string;
  category: string;
  tags: string[];
  active?: boolean;
  status?: ActivityStatus;
  leadName?: string;
  leadContact?: string;
  media?: string[];
  videoUrl?: string | null;
}
