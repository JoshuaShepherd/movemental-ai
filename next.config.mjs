/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Default Templates entry → pastoral-warm with Alan (alan-hirsch) as default leader
      {
        source: '/templates',
        destination: '/templates/library/pastoral-warm/?leader=alan-hirsch',
        permanent: false,
      },
      {
        source: '/templates/',
        destination: '/templates/library/pastoral-warm/?leader=alan-hirsch',
        permanent: false,
      },
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
      // Template subfolders: serve index.html so CSS/JS relative paths work.
      // Exclude templates-manifest.json so the manifest is served as static JSON, not redirected to .../index.html
      {
        source: '/templates/library/((?!templates-manifest\\.json$)[^/]+)',
        destination: '/templates/library/$1/index.html',
        permanent: false,
      },
      {
        source: '/templates/library/((?!templates-manifest\\.json$)[^/]+)/',
        destination: '/templates/library/$1/index.html',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
