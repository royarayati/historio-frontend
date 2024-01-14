
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  output: "standalone",
  basePath: '/new_inlab',
};

module.exports = nextConfig;
