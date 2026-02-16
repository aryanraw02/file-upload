import { apiService } from "@/lib/api";

export default async function RecentUploadList() {
    let files = [];

    try {
        const data = await apiService.getFiles();

        const list = Array.isArray(data)
            ? data
            : data?.data || data?.files || [];

        files = Array.isArray(list)
            ? list.slice(-10).reverse()
            : [];
    } catch (error) {
        console.error("Recent uploads fetch failed:", error);
        files = [];
    }

    if (files.length === 0) {
        return (
            <div className="text-text/60 text-sm p-4">
                No recent uploads found.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {files.map((file) => (
                <div
                    key={file._id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface/60 border border-text/10 text-text hover:bg-accent/10 transition-colors"
                >
                    <span className="truncate font-medium">
                        {file.filename || "Unnamed File"}
                    </span>
                    <span className="text-xs text-text/60">
                        {typeof file.size === "number"
                            ? `${(file.size / 1024).toFixed(1)} KB`
                            : "-"}
                    </span>
                </div>
            ))}
        </div>
    );
}
