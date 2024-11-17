// next.config.js

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Disable PWA features in development
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js configuration

  // If you have custom webpack configurations
  webpack(config:any, { isServer }: { isServer:boolean}) {
    if (!isServer) {
      // Ensure no conflicting plugins are added
    }
    return config;
  },
};

module.exports = withPWA(nextConfig);
