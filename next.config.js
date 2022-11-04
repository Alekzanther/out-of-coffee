/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['static.mathem.se'],
    hostname: 'static.mathem.se',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.mathem.se',
      },
    ],
  },
};

module.exports = nextConfig;
