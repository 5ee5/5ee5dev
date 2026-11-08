import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Pages are prerendered, so a per-request nonce isn't possible and inline
 * scripts have to stay allowed. The policy still shuts out foreign scripts,
 * plugins, framing and stray form targets.
 */
const csp = [
  "default-src 'self'",
  // React needs eval in dev only.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // Friends' 88x31 buttons come from their own sites.
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  // Hot reload talks over a websocket in dev.
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  // The two webring widgets.
  "frame-src https://ring.pre1ude.dev https://ring.5ee5.dev",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? [],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
