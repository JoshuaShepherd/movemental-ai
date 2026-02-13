/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/onboarding',
        destination: '/how-it-works',
        permanent: true,
      },
      {
        source: '/how-it-works-new',
        destination: '/how-it-works',
        permanent: true,
      },
      {
        source: '/how-it-works-final',
        destination: '/how-it-works',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
