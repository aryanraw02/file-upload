import { apiService } from "@/lib/api";

export default async function HistoryTableBody() {
    let files = [];
    try {
        const data = await apiService.getSharedFiles();
        files = Array.isArray(data) ? data : data?.data || [];
    } catch (err) {
        console.error("Fetch error:", err);
        files = [];
    }

    return (
        <div className="flex flex-col w-full">
            {files.length > 0 ? (
                files.map((file) => (
                    <div
                        key={file._id}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-text/10 hover:bg-accent/10 transition-colors min-w-0"
                    >
                        <div className="w-full lg:flex-1 min-w-0">
                            <div className="lg:hidden text-xs font-semibold uppercase tracking-wide text-text/50 mb-1">File name</div>
                            <div className="font-medium truncate pr-2 text-text">
                                {file?.file?.filename || file?.fileId?.filename || "-"}
                            </div>
                        </div>

                        <div className="w-full lg:flex-1 min-w-0">
                            <div className="lg:hidden text-xs font-semibold uppercase tracking-wide text-text/50 mb-1">Email</div>
                            <div className="truncate text-sm text-text/60">
                                {file?.receiverEmail || "-"}
                            </div>
                        </div>

                        <div className="w-full lg:flex-1 min-w-0">
                            <div className="lg:hidden text-xs font-semibold uppercase tracking-wide text-text/50 mb-1">Datetime</div>
                            <div className="text-sm text-text/60">
                                {file.createdAt
                                    ? new Date(file.createdAt).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true,
                                    })
                                    : "-"}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-10 text-center text-text/60">No history found.</div>
            )}
        </div>
    );
}