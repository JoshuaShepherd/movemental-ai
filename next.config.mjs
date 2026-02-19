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
      {
        source: '/templates/dave-ferguson',
        destination: '/templates/dave-ferguson/index.html',
        permanent: false,
      },
      {
        source: '/templates/dave-ferguson/',
        destination: '/templates/dave-ferguson/index.html',
        permanent: false,
      },
      {
        source: '/templates/library',
        destination: '/templates/library/index.html',
        permanent: false,
      },
      {
        source: '/templates/library/',
        destination: '/templates/library/index.html',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
