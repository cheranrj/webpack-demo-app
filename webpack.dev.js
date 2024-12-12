const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name][ext]",
    clean: true, // Automatically clean the output directory before each build
  },
  //Setup loaders
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 3. Inject styles into DOM
          "css-loader", // 2. Turns css into commonjs
          "sass-loader", // 1. Turns sass into css
        ],
      },
    ],
  },
  plugins: [
    // To inject the html page in the bundle(if)
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
});
