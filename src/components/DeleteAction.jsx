"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/lib/api.client";
import toast from "react-hot-toast";
import Modal from "./Modal";

export default function DeleteAction({ fileId, publicId, onSuccess }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (deleting) return;
        setDeleting(true);

        try {
            const token = localStorage.getItem("token");
            const res = await apiService.deleteFile(fileId, publicId, token);

            if (res.ok) {
                if (typeof onSuccess === "function") {
                    onSuccess();
                }
                toast.success("File deleted successfully!");
                router.refresh();
                window.dispatchEvent(new Event("fileUploaded"));
                setOpen(false);
            } else {
                toast.error("Failed to delete file.");
            }
        } catch (err) {
            console.error("Delete failed", err);
            toast.error("Failed to delete file.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="hover:text-red-500 transition-all hover:scale-110 text-text/70"
                title="Delete File"
            >
                <Trash2 size={18} />
            </button>

            <Modal
                open={open}
                title="Delete file?"
                onClose={() => (deleting ? null : setOpen(false))}
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            disabled={deleting}
                            autoFocus
                            className="px-4 py-2 rounded-xl bg-text/5 hover:bg-text/10 border border-text/10 text-text/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleting}
                            className="px-4 py-2 rounded-xl border-2 border-red-400/40 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </>
                }
            >
                <p className="text-text/80 leading-relaxed">
                    This action can’t be undone. The file will be removed from your uploads.
                </p>
            </Modal>
        </>
    );
}
