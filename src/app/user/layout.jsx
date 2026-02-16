"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { fetchProfilePicture } from "./actions";
import Navbar from "@/components/Navbar";
import { apiService as clientApi } from "@/lib/api.client";

export default function UserLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(min-width: 1024px)");
    const syncToViewport = () => setSidebarOpen(media.matches);

    syncToViewport();
    media.addEventListener("change", syncToViewport);
    return () => media.removeEventListener("change", syncToViewport);
  }, []);

  useEffect(() => {
    const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);
    window.addEventListener("sidebarToggle", handleSidebarToggle);
    return () => window.removeEventListener("sidebarToggle", handleSidebarToggle);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const init = async () => {
      try {
        const authData = await clientApi.verifyToken(token);
        if (!authData) throw new Error("Invalid token");
        const userData = { name: authData.fullname, email: authData.email };
        setUser(userData);

        try {
          const url = await fetchProfilePicture(token);
          if (url) {
            setProfilePic(url);
          }
        } catch (e) {
          console.warn("Could not fetch profile picture via fetchProfilePicture", e);
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        localStorage.removeItem("token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-accent" />
          <p className="text-sm font-medium text-text/80">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div
        className={`overflow-hidden transition-[width] duration-300 ease-in-out fixed inset-y-0 left-0 z-50 lg:static lg:shrink-0 ${sidebarOpen ? "w-80 pointer-events-auto" : "w-0 pointer-events-none"
          }`}
      >
        <div
          className={`transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-80"
            }`}
        >
          <Sidebar
            user={user}
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 min-h-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}