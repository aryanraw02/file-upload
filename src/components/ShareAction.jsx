"use client";

import { useState } from "react";
import { Forward } from "lucide-react";
import { apiService } from "@/lib/api.client";
import toast from "react-hot-toast";
import Modal from "./Modal";

export default function ShareAction({ fileId, fileUrl }) {
    const canShare = Boolean(fileUrl || fileId);

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [sharing, setSharing] = useState(false);

    const close = () => {
        if (sharing) return;
        setOpen(false);
    };

    const startShare = () => {
        if (!canShare) {
            toast.error("No file URL available to share.");
            return;
        }
        setEmail("");
        setOpen(true);
    };

    const handleShare = async () => {
        if (sharing) return;

        const effectiveUrl =
            fileUrl || (fileId ? apiService.getDownloadUrl(fileId) : "");

        if (!effectiveUrl) {
            toast.error("No file URL available to share.");
            return;
        }

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            toast.error("Please enter an email.");
            return;
        }

        // ✅ Better email validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(trimmedEmail)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to share files.");
            return;
        }

        setSharing(true);

        try {
            const shareData = {
                email: trimmedEmail,
                file_url: effectiveUrl,
                fileId,
            };

            const res = await apiService.shareFile(shareData, token);

            if (res.ok) {
                toast.success("File shared successfully!");
                setOpen(false);
            } else {
                let message = "Error sharing file.";
                try {
                    const data = await res.json();
                    message = data?.message || data?.error || message;
                } catch {
                    // ignore JSON parsing error
                }
                toast.error(message);
            }
        } catch (err) {
            console.error("Sharing failed:", err);
            toast.error("Sharing failed. Please try again.");
        } finally {
            setSharing(false);
        }
    };

    return (
        <>
            <button
                onClick={startShare}
                disabled={!canShare}
                className="hover:text-green-500 transition-all hover:scale-110 text-text/70 disabled:opacity-60 disabled:cursor-not-allowed"
                title="Share File"
            >
                <Forward size={18} />
            </button>

            <Modal
                open={open}
                title="Share file"
                onClose={close}
                footer={
                    <>
                        <button
                            type="button"
                            onClick={close}
                            disabled={sharing}
                            className="px-4 py-2 rounded-xl bg-text/5 hover:bg-text/10 border border-text/10 text-text/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleShare}
                            disabled={sharing || !email.trim()}
                            className="px-4 py-2 rounded-xl bg-accent text-background hover:bg-accent/80 active:scale-[0.98] transition-all font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {sharing ? "Sharing..." : "Share"}
                        </button>
                    </>
                }
            >
                <div>
                    <label className="block mb-2 text-text/90 font-semibold text-sm uppercase tracking-wide">
                        Enter the email you want to share with
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleShare();
                            }
                        }}
                        disabled={sharing}
                        autoFocus
                        placeholder="Enter email"
                        autoComplete="off"
                        className="w-full p-4 rounded-xl text-text bg-background/50 border-2 border-accent/30 focus:outline-none focus:border-accent focus:bg-background transition-all placeholder:text-text/40 disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                </div>
            </Modal>
        </>
    );
}
