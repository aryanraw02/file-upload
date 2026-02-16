"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthForm from "@/components/AuthForm";

export default function SignupClient() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        mobile: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const fullname = formData.fullname.trim();
    const email = formData.email.trim().toLowerCase();
    const mobile = formData.mobile.trim();
    const password = formData.password;
    const isDirty =
        fullname.length > 0 ||
        email.length > 0 ||
        mobile.length > 0 ||
        password.length > 0;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const isValid = emailRegex.test(email) && mobileRegex.test(mobile) && password.length > 0;
    const submitEnabled = isDirty && isValid;

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value.startsWith(" ")) return;
        if (name === "mobile" && !/^\d*$/.test(value)) return;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email address");
            return;
        }
        if (!mobileRegex.test(mobile)) {
            toast.error("Enter a valid mobile number");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("https://file-system-xi.vercel.app/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...(fullname ? { fullname } : {}),
                    email,
                    mobile,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Signup failed");
                return;
            }

            toast.success("Signup successful! Please login.");
            router.push("/login");
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthForm
            type="signup"
            formData={formData}
            loading={loading}
            submitEnabled={submitEnabled}
            onChange={handleChange}
            onSubmit={handleSignup}
        />
    );
}
