/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/work', destination: '/portfolio', permanent: true },
      { source: '/contact', destination: '/work-with-me', permanent: true },
      { source: '/about', destination: '/the-human', permanent: false },
    ]
  },
}

export default nextConfig
