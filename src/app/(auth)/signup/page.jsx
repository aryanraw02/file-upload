import { redirect } from "next/navigation";
import SignupClient from "@/components/SignupClient";
import { apiService } from "@/lib/api";

export default async function SignupPage() {
    const authData = await apiService.verifyToken();
    if (authData) {
        redirect("/user/dashboard");
    }

    return <SignupClient />;
}
