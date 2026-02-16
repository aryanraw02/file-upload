import { apiService } from "@/lib/api";
import DeleteAction from "@/components/DeleteAction";
import DownloadAction from "@/components/DownloadAction";
import ShareAction from "@/components/ShareAction";

export default async function FileTableBody() {
    let files = [];
    try {
        const data = await apiService.getFiles();
        files = Array.isArray(data) ? data : data?.data || data?.files || [];
    } catch (err) {
        console.error("Fetch error:", err);
        files = [];
    }

    return (
        <div className="flex flex-col w-full">
            {files.length > 0 ? (
                files.map((file) => {
                    const targetUrl = file.file_url || file.url || file.secure_url;

                    return (
                        <div
                            key={file._id}
                            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-text/10 hover:bg-accent/10 transition-colors min-w-0"
                        >
                            <div className="w-full lg:flex-1 min-w-0">
                                <div className="lg:hidden text-xs font-semibold uppercase tracking-wide text-text/50 mb-1">Name</div>
                                <div className="font-medium truncate text-text">{file.filename}</div>
                            </div>

                            <div className="w-full lg:flex-1 min-w-0">
                                <div className="lg:hidden text-xs font-semibold uppercase tracking-wide text-text/50 mb-1">Type</div>
                                <div className="text-sm text-text/60 truncate">{file.type || "file"}</div>
                            </div>

                            <div className="w-full lg:flex-1 min-w-0">
                                <div className="lg:hidden text-xs font-semibold uppercase tracking-wide text-text/50 mb-1">Size</div>
                                <div className="text-sm text-text/60">
                                    {typeof file.size === "number" ? `${(file.size / 1024).toFixed(2)} KB` : "-"}
                                </div>
                            </div>

                            <div className="w-full lg:flex-1 min-w-0">
                                <div className="lg:hidden text-xs font-semibold uppercase tracking-wide text-text/50 mb-1">Created</div>
                                <div className="text-sm text-text/60">
                                    {file.createdAt ? new Date(file.createdAt).toLocaleDateString() : "-"}
                                </div>
                            </div>

                            <div className="w-full lg:w-32">
                                <div className="lg:hidden text-xs font-semibold uppercase tracking-wide text-text/50 mb-2">Actions</div>
                                <div className="flex flex-wrap gap-3 lg:justify-end">
                                    <ShareAction fileId={file._id} fileUrl={targetUrl} />

                                    <DownloadAction
                                        fileId={file._id}
                                        fileUrl={targetUrl}
                                        fileName={file.filename}
                                    />

                                    <DeleteAction
                                        fileId={file._id}
                                        publicId={file.public_id || file.publicId}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="p-10 text-center text-text/60">No files found.</div>
            )}
        </div>
    );
}