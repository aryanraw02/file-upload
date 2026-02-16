"use client";

import { useEffect, useId } from "react";
import { X } from "lucide-react";

export default function Modal({
    open,
    title,
    children,
    footer,
    onClose,
    closeOnBackdrop = true,
}) {
    const titleId = useId();

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
        >
            <div
                className="absolute inset-0 bg-background/70 backdrop-blur-sm"
                onClick={closeOnBackdrop ? onClose : undefined}
            />

            <div
                className="relative w-full max-w-md rounded-2xl bg-surface border border-text/10 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-3 p-5 border-b border-text/10 bg-surface/80">
                    <h2 id={titleId} className="text-text font-semibold text-lg">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="p-2 rounded-lg bg-text/5 hover:bg-text/10 border border-text/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                    >
                        <X className="w-4 h-4 text-text/80" />
                    </button>
                </div>

                <div className="p-5">{children}</div>

                {footer ? (
                    <div className="p-5 pt-0 flex items-center justify-end gap-3">{footer}</div>
                ) : null}
            </div>
        </div>
    );
}
