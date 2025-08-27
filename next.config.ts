import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/notes", destination: "/notes/filter/All", permanent: false },
      { source: "/notes/", destination: "/notes/filter/All", permanent: false },
    ];
  },
};

export default nextConfig;
