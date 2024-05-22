/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "canny-hound-232.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
