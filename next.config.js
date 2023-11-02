/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
    images: {
      domains: ['img.youtube.com'],
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
          },
        ],
      },
}

module.exports = nextConfig
