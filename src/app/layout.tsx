import type { Metadata, Viewport } from "next";
import profileImage from "../../public/e5.png";
import blinkieImage from "../../public/5ee5.png";
import "./globals.css";

export const metadata: Metadata = {
  title: "5ee5.dev | Personal Portfolio",
  description: "Developer, Linux enthusiast, Runner.",
  icons: {
    icon: "/e5.ico",
  },
  openGraph: {
    title: "5ee5.dev",
    description: "Developer, Linux enthusiast, Runner.",
    url: "https://5ee5.dev/",
    siteName: "5ee5.dev",
    images: [`https://5ee5.dev${profileImage.src}`],
  },
  other: {
    "pride-flag": "transgender",
    "site-button": `https://5ee5.dev${blinkieImage.src}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#4ADE80",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scheme-dark overflow-x-clip">
      <body className="min-h-screen overflow-x-clip bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
