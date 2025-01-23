
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   reactStrictMode: false,
//   trailingSlash: true,
//   output: "standalone",
//   // sync basePasth with images.publicUrlPrefix in plasmic.json
//   basePath: '/new_inlab',
// };

// module.exports = nextConfig;

// next.config.js

// import withPWA from 'next-pwa';
const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,      // Enable React strict mode for improved error handling
  swcMinify: true,            // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
  },
  trailingSlash: true,
  output: "standalone",
  // sync basePasth with images.publicUrlPrefix in plasmic.json
  basePath: '/new_inlab',
};

module.exports = withPWA({
  dest: "public",         // destination directory for the PWA files
  disable: false,
  register: true,         // register the PWA service worker
  skipWaiting: true,      // skip waiting for service worker activation
})(nextConfig);


