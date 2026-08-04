export type BlogPostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: BlogPostStatus;
  publishDate: string; // ISO date string
  featuredImage: string | null; // Firebase Storage download URL
  videoUrl: string | null;
  views: number;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

/** Shape accepted from the "Create New Blog" form / POST /api/blog body. */
export interface BlogPostInput {
  title: string;
  content: string;
  category: string;
  tags: string[];
  status?: BlogPostStatus;
  publishDate?: string;
  featuredImage?: string | null;
  videoUrl?: string | null;
}
