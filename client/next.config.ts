import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c5oog42ny7.ufs.sh",
        pathname: "/f/**",
      },
    ],
  },
};

export default nextConfig;
