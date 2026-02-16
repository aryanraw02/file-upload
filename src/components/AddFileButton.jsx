"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/lib/api.client";
import { revalidateUpload } from "@/app/user/actions";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";


export default function AddFileButton() {
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const token = localStorage.getItem("token");
        try {
            const res = await apiService.uploadFile(formData, token);

            if (res.ok) {

                await revalidateUpload();
                window.dispatchEvent(new Event("fileUploaded"));
            } else {
                toast.error("Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Upload failed");
        } finally {
            setUploading(false);
            e.target.value = null;
        }
    };

    return (
        <label className="bg-accent/20 text-text border border-text/10 px-6 py-2 rounded-lg font-bold cursor-pointer hover:bg-accent/30 transition-colors inline-flex items-center gap-2">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin text-accent" /> : null}
            {uploading ? "Uploading..." : "+ Add Files"}
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/png,image/jpeg,image/gif" />
        </label>
    );
}