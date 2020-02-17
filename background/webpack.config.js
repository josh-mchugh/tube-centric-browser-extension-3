var path = require("path");
var webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, './src/main.js'),
    devtool: "cheap-source-map",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
    },
    optimization:{
        minimize: false
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          "BASE_URL": JSON.stringify("http://localhost:8080")
        }
      }),
    ]
};
