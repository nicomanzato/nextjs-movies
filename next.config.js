/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, module: false, path: false };
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
