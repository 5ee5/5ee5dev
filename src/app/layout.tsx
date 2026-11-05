import type { Metadata, Viewport } from "next";
import profileImage from "../../public/e5.png";
import blinkieImage from "../../public/5ee5.png";
import SkipLink from "@/components/SkipLink";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://5ee5.dev"),
  title: "5ee5.dev | Personal Portfolio",
  /* Deliberately differs from openGraph.description below, which the webring reads. */
  description: "Personal site of 5ee5",
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
  themeColor: "#071209",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scheme-dark overflow-x-clip ${fontVariables}`}>
      <body className="min-h-screen overflow-x-clip bg-background text-foreground">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
