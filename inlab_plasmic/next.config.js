
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




// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "synapps-yg",
    project: "nextjs_inlab_plus",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
