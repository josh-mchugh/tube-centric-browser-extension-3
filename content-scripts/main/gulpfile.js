var gulp = require("gulp");
var del = require("del");
var argv = require("yargs").argv;
var webpack = require("webpack");
var webpackStream = require("webpack-stream");

gulp.task("clean", del.bind(null, ["../../dist/content-scripts/main/**"], {force: true}));

gulp.task("webpack", function() {
    return gulp.src("./src/main.js")
      .pipe(webpackStream(require("./webpack.config"), webpack))
      .pipe(gulp.dest("../../dist/content-scripts/main"));
});

gulp.task("build", gulp.series(
    "clean",
    "webpack"
));
