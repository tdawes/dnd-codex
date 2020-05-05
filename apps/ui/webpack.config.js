// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const APP_PATH = path.resolve(__dirname, "src");
const PUBLIC_PATH = path.resolve(__dirname, "public");

module.exports = {
  entry: [path.join(APP_PATH, "index.tsx")],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
    modules: ["node_modules"],
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: ["babel-loader", "source-map-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            loader: [
              "style-loader",
              { loader: "css-loader", options: { importLoaders: 1 } },
            ],
            exclude: /node_modules/,
          },
          {
            loader: [
              "style-loader",
              { loader: "css-loader", options: { importLoaders: 1 } },
            ],
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|ico|eot|woff|woff2|ttf)$/,
        loader: "file-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(PUBLIC_PATH, "index.html"),
    }),
    // new ForkTsCheckerWebpackPlugin(),
  ],
};
