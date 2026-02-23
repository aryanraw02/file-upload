import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://file-upload-psi-five.vercel.app"),

  title: "FileShare",
  description: "A simple and secure file upload app built with Next.js",

  openGraph: {
    title: "FileShare",
    description: "A simple and secure file upload app built with Next.js",
    url: "https://file-upload-psi-five.vercel.app",
    siteName: "FileShare",
    images: [
      {
        url: "/cloud.png",
        width: 1200,
        height: 630,
        alt: "FileShare App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FileShare",
    description: "A simple and secure file upload app built with Next.js",
    images: ["/cloud.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
