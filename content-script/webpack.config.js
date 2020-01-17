var path = require("path");

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/main.js'),
    devtool: "cheap-source-map",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization:{
        minimize: false
    }
};
