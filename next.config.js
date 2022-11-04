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
  webpack(config) {
    // config.resolve.fallback = {
    // ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
    // // by next.js will be dropped. Doesn't make much sense, but how it is
    // fs: false, // the solution
    // module: false,
    // };
    // config.experiments = config.experiments || {};
    // config.experiments.topLevelAwait = true;
    return config;
  },
};

module.exports = nextConfig;
