import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Lets a cloudflared quick tunnel load dev-server chunks when previewing on
  // another device; without it the page renders but never hydrates.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
