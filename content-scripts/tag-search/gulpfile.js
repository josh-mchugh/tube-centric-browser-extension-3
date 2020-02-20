var del = require("del");
var gulp = require("gulp");
var concat = require("gulp-concat");
var exec = require('child_process').exec;

var componentName = "tag-search";

gulp.task("clean", del.bind(null, ["../../dist/content-scripts/" + componentName + "/**"], {force: true}));

gulp.task("build:js", function(cb) {
  var buildType = process.env.NODE_ENV === "production" ? ":prod" : "";
  exec('npm run build' + buildType, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task("copy:js", function() {
    return gulp.src(["./build/static/js/*.js", "!./build/static/js/*.js.map"])
      .pipe(concat(componentName + ".js"))
      .pipe(gulp.dest("../../dist/content-scripts/" + componentName));
});

gulp.task("copy:css", function() {
    return gulp.src(["./build/static/css/*.css", "!./build/static/css/*.css.map"])
      .pipe(concat(componentName + ".css"))
      .pipe(gulp.dest("../../dist/content-scripts/" + componentName));
});

gulp.task("build", gulp.series(
    "clean",
    "build:js",
    "copy:js",
    "copy:css"
));
