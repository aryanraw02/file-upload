import "server-only";
import { cookies } from "next/headers";


const BASE_URL = "https://file-system-xi.vercel.app/api";

async function getServerToken() {
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value;
}

export const apiService = {
    
    getDashboardStats: async () => {
        const token = await getServerToken();
        if (!token) return null;
        const res = await fetch(`${BASE_URL}/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store'
        });
        return res.ok ? res.json() : null;
    },
    
    getFiles: async () => {
        const token = await getServerToken();
        if (!token) return [];
        const res = await fetch(`${BASE_URL}/file`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store'
        });
        return res.ok ? res.json() : [];
    },
    
    getSharedFiles: async () => {
        const token = await getServerToken();
        if (!token) return [];
        const res = await fetch(`${BASE_URL}/share`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store'
        });
        return res.ok ? res.json() : [];
    },

    
    
    uploadFile: async (formData, token) => {
        return fetch(`${BASE_URL}/file`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }, 
            body: formData,
        });
    },

    
    deleteFile: async (id, publicId, token) => {
        return fetch(`${BASE_URL}/file?id=${id}&public_id=${publicId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    
    shareFile: async (shareData, token) => {
        return fetch(`${BASE_URL}/share`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(shareData),
        });
    },
    
    getDownloadUrl: (fileId) => {
        return `${BASE_URL}/file/download/${fileId}`;
    }
};
