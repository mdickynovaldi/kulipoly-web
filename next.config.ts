import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "foto.co.id",
      },
      {
        protocol: "https",
        hostname: "www.diykamera.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
      {
        protocol: "https",
        hostname: "jsp.co.id",
      },
    ],
  },
};

export default nextConfig;
