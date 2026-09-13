import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "royal-smash.cc" }],
      destination: "https://www.royal-smash.cc/:path*",
      permanent: true,
    }];
  },
};

export default nextConfig;
