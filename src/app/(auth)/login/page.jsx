import { redirect } from "next/navigation";
import LoginClient from "@/components/LoginClient";
import { apiService } from "@/lib/api";

export default async function LoginPage() {
    const authData = await apiService.verifyToken();
    if (authData) {
        redirect("/user/dashboard");
    }

    return <LoginClient />;
}

