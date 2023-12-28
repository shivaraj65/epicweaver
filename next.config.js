/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "rc-util",
    "@ant-design",
    "zustand",
    "antd",
    "rc-pagination",
    "rc-picker",
  ],
};

module.exports = nextConfig;
