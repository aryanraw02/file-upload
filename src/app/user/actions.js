"use server";
import { revalidatePath } from "next/cache";

export async function fetchProfilePicture(token) {
  if (!token) return null;

  try {
    const upstreamRes = await fetch(
      "https://file-system-xi.vercel.app/api/profile-picture",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "manual",
      }
    );

    // Handle redirect responses (e.g., to Cloudinary)
    if (upstreamRes.status >= 300 && upstreamRes.status < 400) {
      const location = upstreamRes.headers.get("location");
      if (location) return location;
    }

    // Try to parse JSON and normalize the URL field
    try {
      const data = await upstreamRes.json();
      if (data && (data.imageUrl || data.url)) {
        return data.imageUrl || data.url;
      }
    } catch {
      // If response is not JSON, just ignore and fall through
    }

    return null;
  } catch (error) {
    console.error("fetchProfilePicture server action error:", error);
    return null;
  }
}

export async function revalidateUpload() {
  revalidatePath("/user/myfiles");
}
