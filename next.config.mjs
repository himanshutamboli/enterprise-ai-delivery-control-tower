/** @type {import('next').NextConfig} */

// GitHub Pages serves project sites under /<repo-name>. Set NEXT_PUBLIC_BASE_PATH
// (e.g. "/enterprise-ai-control-tower") in the GitHub Actions workflow so assets
// and links resolve correctly. Locally it stays empty so dev/preview work at root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  // Static HTML export — required for free GitHub Pages hosting (no SSR/server runtime).
  output: 'export',
  basePath,
  // Emit URLs as /path/ so GitHub Pages resolves nested routes without a server.
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimization server.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
