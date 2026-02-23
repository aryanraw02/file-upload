import Sitemap from "./sitemap";

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/user/', '/api/', '/login', '/signup'],
            },
        ],
        sitemap: 'https://file-system-xi.vercel.app/sitemap.xml',
    };
}