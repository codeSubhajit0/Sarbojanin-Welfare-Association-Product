import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase-client";

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/**
 * Uploads a single image file to Firebase Storage under `folder/` and
 * returns its public download URL. Requires the caller to be signed in
 * with Firebase Auth client-side (the admin, after logging in) — Storage
 * security rules should require `request.auth != null` for writes.
 */
export async function uploadImage(file: File, folder: "blog" | "activities"): Promise<string> {
    if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error("Please upload a JPEG, PNG, WebP, or GIF image.");
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        throw new Error(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    const path = `${folder}/${Date.now()}-${safeName}`;
    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, file, { contentType: file.type });
    return getDownloadURL(storageRef);
}
