/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['graph.mapillary.com'], // Add Mapillary domain for image loading
  },
  // Ensure proper environment variables are available
  env: {
    NEXT_PUBLIC_MAPILLARY_CLIENT_ID: process.env.NEXT_PUBLIC_MAPILLARY_CLIENT_ID,
  },
}

module.exports = nextConfig 