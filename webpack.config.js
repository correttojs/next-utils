const path = require("path");
const pj = require("./package.json");
const peers = Object.keys(pj.peerDependencies).reduce((prev, pd) => {
  prev[pd] = `commonjs2 ${pd}`;

  return prev;
}, {});
console.log(peers);
module.exports = {
  entry: {
    useReactQuery: "./src/useReactQuery/index.ts",
    useTranslations: "./src/useTranslations/index.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  experiments: {
    outputModule: true,
  },
  output: {
    library: {
      type: "module",
    },
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  externals: {
    "react-query": "commonjs2 react-query",
    "@graphql-typed-document-node/core":
      "commonjs2 @graphql-typed-document-node/core",
    "graphql-request": "commonjs2 graphql-request",
    ["next/router"]: "commonjs2 next/router",
    react: "commonjs2 react",
  },
};
