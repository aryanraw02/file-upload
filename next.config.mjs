/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudinary.com', 
      },
      {
        protocol: 'https',
        hostname: 'file-system-xi.vercel.app',
      },
    ],
  },
};

export default nextConfig;