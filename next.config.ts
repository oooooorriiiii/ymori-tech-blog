import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/ymori-tech-blog',
  assetPrefix: '/ymori-tech-blog', // ← 静的アセットのパスも調整
};

export default nextConfig;
