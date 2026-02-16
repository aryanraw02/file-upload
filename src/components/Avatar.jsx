"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function Avatar({ name, email, profilePic, setProfilePic }) {
  const [uploading, setUploading] = useState(false);

  const firstLetter = name?.[0]?.toUpperCase() || "U";
  const displayName = name ? name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ") : "";

  const handleUpload = async (file) => {
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl === "string") {
        setProfilePic(dataUrl);
      }
    };
    reader.readAsDataURL(file);

    setUploading(true);
    const formData = new FormData();
    formData.append("picture", file);

    try {
      const uploadRes = await fetch("https://file-system-xi.vercel.app/api/profile-picture", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (uploadRes.ok) {
        const data = await uploadRes.json();
        const serverUrl = data.imageUrl || data.url;

        if (serverUrl) {
          // 2. SERVER CONFIRMATION: Replace the local preview with the official URL
          setProfilePic(serverUrl);
        }
      } else {
        toast.error("Upload failed on the server.");
      }
    } catch (err) {
      console.error("Upload network error:", err);
      toast("Could not sync with server, but your change is saved locally.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-6 px-4">
      <label className="cursor-pointer group relative">
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleUpload(e.target.files[0])}
          disabled={uploading}
        />

        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent/80 shadow-xl transition-all duration-300 group-hover:scale-105 relative">
          {profilePic ? (
            <div className="relative w-full h-full">
              <Image
                src={profilePic}
                alt="Profile"
                height={120}
                width={120}
                className={`object-cover ${uploading ? 'opacity-40' : 'opacity-100'}`}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-accent flex items-center justify-center text-5xl font-bold text-text/80">
              {uploading ? <Loader2 className="h-10 w-10 animate-spin text-text/80" /> : firstLetter}
            </div>
          )}

          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-9 w-9 animate-spin text-accent" />
            </div>
          ) : null}
        </div>

        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xs font-medium">{uploading ? "Wait..." : "Change"}</span>
        </div>
      </label>

      <div className="text-center">
        <h3 className="text-xl font-bold text-text">{displayName}</h3>
        <p className="text-sm text-text/50 truncate max-w-50">{email}</p>
      </div>
    </div>
  );
}