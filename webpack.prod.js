const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name].[hash][ext]",
    clean: true, // Automatically clean the output directory before each build
  },

  optimization: {
    // minimize: true,
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(), // for css minification
      new TerserPlugin(), // for js minification
    ],
  },

  // To extract css content as a single global css file, which is bundled together in main.js file
  // mini-css-extract-plugin for webpack 4
  plugins: [
    // To inject the html page in the bundle(if)
    new HtmlWebpackPlugin({
      template: "./src/template.html",

      //Optional step for HTML minification
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),

    //Minify the css file
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),

    //Bundle analyzer with report
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // or 'server' or 'disabled'
      openAnalyzer: true, // Automatically opens the report
    }),
  ],
  //Setup loaders
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css file content into separate css file
          "css-loader", // 2. Turns css into commonjs
          "sass-loader", // 1. Turns sass into css
        ],
      },
    ],
  },
});
