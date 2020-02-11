var path = require("path");
var webpack = require("webpack");
var TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "./src/main.js"),
    devtool: "none",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          "BASE_URL": JSON.stringify("https://www.tubecentric.com")
        }
      }),
    ]
};
