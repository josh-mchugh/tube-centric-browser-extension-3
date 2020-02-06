var gulp = require("gulp");
var del = require("del");
var argv = require("yargs").argv;
var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var argv = require('yargs').argv

gulp.task("clean", del.bind(null, ["../dist/background/**"], {force: true}));

gulp.task("webpack", function() {
    var config = process.env.NODE_ENV === "production" ? require("./webpack.prod.config") : require("./webpack.config");
    return gulp.src("./src/main.js")
      .pipe(webpackStream(config, webpack))
      .pipe(gulp.dest("../dist/background"));
});

gulp.task("build", gulp.series(
    "clean",
    "webpack"
));
