var gulp = require("gulp");
var del = require("del");
var argv = require('yargs').argv;

gulp.task("clean", del.bind(null, ["../dist/manifest.json", "../dist/icons/**"], {force: true}));

gulp.task("copy", function() {
    return gulp.src("src/**/*")
        .pipe(gulp.dest("../dist"));
});

gulp.task("build", gulp.series(
    "clean",
    "copy"
));
