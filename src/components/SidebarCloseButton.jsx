"use client";

import { X } from "lucide-react";

export default function SidebarCloseButton() {
    const handleClose = () => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new Event("sidebarToggle"));
    };

    return (
        <div className="lg:hidden absolute right-4 top-4">
            <button
                type="button"
                aria-label="Close sidebar"
                onClick={handleClose}
                className="p-2 rounded-lg bg-text/5 hover:bg-text/10 border border-text/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
                <X className="w-5 h-5 text-text/80" />
            </button>
        </div>
    );
}
