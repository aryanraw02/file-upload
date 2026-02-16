"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthForm from "@/components/AuthForm";

export default function LoginClient() {
    const router = useRouter();

    const setTokenCookie = (token) => {
        const secure = window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `token=${token}; Path=/; Max-Age=2592000; SameSite=Lax${secure}`;
    };

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value.startsWith(" ")) return;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = formData.email.trim().toLowerCase();
        const password = formData.password;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("https://file-system-xi.vercel.app/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);
            setTokenCookie(data.token);
            router.replace("/user/dashboard");
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthForm
            type="login"
            formData={formData}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleLogin}
        />
    );
}
