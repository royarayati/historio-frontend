
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  output: "standalone",
  // sync basePasth with images.publicUrlPrefix in plasmic.json
  basePath: '/new_inlab',
};

module.exports = nextConfig;
