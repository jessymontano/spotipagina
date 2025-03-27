/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.spotifycdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.scdn.co",
        pathname: "**",
      },
    ],
  },
  bundlePagesRouterDependencies: true,
};

export default nextConfig;
