import type {Metadata, Viewport} from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Aurora Framework | Garry's Mod Gamemode Framework",
  description:
      "A powerful, modern Garry's Mod gamemode framework built for innovation, performance, and developer experience.",
  keywords: [
    "Garry's Mod",
    "GMod",
    "gamemode",
    "framework",
    "Aurora Framework",
    "game development",
    "Lua",
    "modding",
    "Source engine",
    "developer tools",
    "game scripting",
    "multiplayer",
    "sandbox game",
  ],
  authors: [{ name: "Fedox" }],
  creator: "Fedox",
  publisher: "Aurora Studios",
  applicationName: "The Aurora Framework",
  metadataBase: new URL("https://aurora.fedox.ovh/"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aurora.fedox.ovh",
    title: "The Aurora Framework | Next-Gen Garry's Mod Development",
    description: "A new Garry's Mod gamemode framework built for innovation, performance, and developer experience.",
    siteName: "The Aurora Framework",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Aurora Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Aurora Framework | Garry's Mod Gamemode Framework",
    description: "A new Garry's Mod gamemode framework built for innovation.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#000000"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
