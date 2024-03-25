/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   // 在这里添加 swc-loader 的配置
  //   config.module.rules.push({
  //     test: /\.(js|mjs|jsx|ts|tsx)$/,
  //     include: [path.resolve(__dirname, "app")],
  //     exclude: /node_modules/,
  //     use: [
  //       {
  //         loader: "swc-loader",
  //         options: {
  //           jsc: {
  //             parser: {
  //               syntax: "typescript",
  //               tsx: true,
  //             },
  //             transform: {
  //               legacyDecorator: true,
  //               decoratorMetadata: true,
  //               react: {
  //                 runtime: "automatic",
  //                 pragmaFrag: "React.Fragment",
  //                 throwIfNamespace: true,
  //                 useBuiltins: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     ],
  //   });
  //   return config;
  // },
};

module.exports = nextConfig;
