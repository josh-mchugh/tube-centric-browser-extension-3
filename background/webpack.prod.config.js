var path = require("path");
var webpack = require("webpack");
var dotenv = require("dotenv").config();

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "./src/main.js"),
    devtool: "none",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization:{
        minimize: false
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          "BASE_URL": JSON.stringify("https://www.tubecentric.com")
        }
      }),
    ]
};
