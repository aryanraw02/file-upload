import { apiService } from "@/lib/api";

export default async function RecentSharedList() {
    let files = [];

    try {
        const data = await apiService.getSharedFiles();
        const list = Array.isArray(data) ? data : data?.data || data?.files || [];
        files = Array.isArray(list) ? list.slice(-10).reverse() : [];
    } catch (e) {
        console.error("Recent shared fetch failed:", e);
        files = [];
    }

    if (files.length === 0) {
        return <div className="text-text/60 text-sm p-4">No recently shared files.</div>;
    }

    return (
        <div className="space-y-3">
            {files.map((file) => (
                <div
                    key={file?._id || file?.id || `${file?.email || "shared"}-${file?.fileId || "file"}`}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface/60 border border-text/10 text-text hover:bg-accent/10 transition-colors"
                >
                    <span className="truncate font-medium">{file?.file?.filename || "-"}</span>
                    <span className="text-xs text-text/60">{file?.receiverEmail}</span>
                </div>
            ))}
        </div>
    );
}