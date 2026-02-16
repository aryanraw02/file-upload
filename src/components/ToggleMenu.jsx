"use client";

export default function ToggleMenu({ children }) {
  const handleToggle = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new Event("sidebarToggle"));
  };

  return (
    <button
      type="button"
      aria-label="Toggle sidebar"
      onClick={handleToggle}
      className="p-2 rounded-lg bg-text/5 hover:bg-text/10 border border-text/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      {children}
    </button>
  );
}
