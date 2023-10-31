/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const { GRAPHQL_ENDPOINT } = process.env;

// const isEnabled = ['prod', 'dev'].includes(ENV_SHORT);

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@panter/prisma-inputs", "@panter/react-forms", "@rummel/react-forms-ant"],
  publicRuntimeConfig: {
    GRAPHQL_ENDPOINT
  },
  compiler: {
    styledComponents: true,
  },
  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     test: /\.(graphql|gql)$/,
  //     exclude: /node_modules/,
  //     loader: 'graphql-tag/loader'
  //   });
  //   return config;
  // },
  images: {
    unoptimized: true,
    domains: ['storage.googleapis.com'],
  },
  i18n,
};

module.exports = nextConfig;
