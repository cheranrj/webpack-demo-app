const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js",
  },
  //Setup loaders
  module: {
    rules: [
      // The below css file conversion step will be handled in dev & prod config files for different purpose
      // {
      //   test: /\.scss$/,
      //   use: [
      //     "style-loader", // 3. Inject styles into DOM
      //     "css-loader", // 2. Turns css into commonjs
      //     "sass-loader", // 1. Turns sass into css
      //   ],
      // },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      // Assets loader(It will load all our assets in to the build)
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  // Moving this step to dev and prod config files to get different behavior(we don't need HTML minification
  // in dev, only in prod)
  // plugins: [
  //   // To inject the html page in the bundle(if)
  //   // new HtmlWebpackPlugin({
  //   //   template: "./src/template.html",
  //   // }),
  // ],
};
