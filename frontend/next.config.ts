import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/auth/:path*", destination: "/api/auth/:path*" }];
  },
};

export default nextConfig;
