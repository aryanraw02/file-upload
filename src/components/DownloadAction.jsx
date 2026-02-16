"use client";
import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DownloadAction({ fileUrl, fileName }) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!fileUrl) {
            toast.error("No file URL available.");
            return;
        }

        if (isDownloading) return;

        setIsDownloading(true);
        try {
            toast.loading("Preparing download...", { id: "download" });
            const response = await fetch(fileUrl);

            if (!response.ok) throw new Error("File fetch failed");

            const blob = await response.blob();

            const localUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = localUrl;

            link.download = fileName || "download";

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(localUrl);

            toast.success("Download started", { id: "download" });
        } catch (error) {
            console.error("Download Error:", error);
            window.open(fileUrl, "_blank");
            toast.error("Could not download directly. Opened in new tab.", {
                id: "download",
            });
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="hover:text-blue-500 transition-all hover:scale-110 text-text/70 disabled:opacity-50"
        >
            {isDownloading ? (
                <Loader2 size={18} className="animate-spin" />
            ) : (
                <Download size={18} />
            )}
        </button>
    );
}