'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const closeSidebarOnMobile = () => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px)");
    if (media.matches) return;
    window.dispatchEvent(new Event("sidebarToggle"));
  };

  return (
    <Link
      href={href}
      onClick={closeSidebarOnMobile}
      className={`block w-full px-5 py-4 rounded-xl font-semibold transition-all duration-200 border-2 ${isActive
          ? "bg-accent text-background border-accent shadow-lg transform scale-[1.02]"
          : "border-text/15 text-text/75 hover:bg-accent/10 hover:border-accent/40 hover:text-accent hover:shadow-md"
        }`}
    >
      {label}
    </Link>
  );
}
