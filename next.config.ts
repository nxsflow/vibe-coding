import type { NextConfig } from "next";
import path from "path";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["yjs"] = path.resolve(__dirname, "node_modules/yjs");
    }
    return config;
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
