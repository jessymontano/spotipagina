/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "image-cdn-ak.spotifycdn.com",
      "mosaic.scdn.co",
      "image-cdn-fa.spotifycdn.com",
      "i.scdn.co",
    ],
  },
  bundlePagesRouterDependencies: true,
};

export default nextConfig;
