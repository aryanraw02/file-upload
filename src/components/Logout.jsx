'use client';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

export default function Logout({ variant = "button" }) {
  const router = useRouter();

  const clearTokenCookie = () => {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `token=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearTokenCookie();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleLogout}
        aria-label="Log out"
        title="Log out"
        className="p-2 rounded-lg border border-red-400/40 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <LogOut className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full py-3.5 rounded-lg border-2 border-red-400/40 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 font-medium cursor-pointer shadow-sm hover:shadow-lg"
    >
      Logout
    </button>
  );
}
