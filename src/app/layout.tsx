import type { Metadata } from "next";
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
  title: "5ee5.dev | Personal Portfolio",
  description: "Personal portfolio of 5ee5 — developer, Linux enthusiast, and runner.",
  icons: {
    icon: "/e5.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* clip, not hidden: `hidden` on one axis forces the other axis to compute
       to `auto`, which turns html/body into scroll containers and breaks the
       sticky sidebar. `clip` leaves the other axis alone. */
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scheme-dark overflow-x-clip`}
    >
      <body className="min-h-screen overflow-x-clip bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
