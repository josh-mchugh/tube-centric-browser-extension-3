var gulp = require("gulp");
var del = require("del");
var argv = require('yargs').argv;

gulp.task("clean", del.bind(null, ["../dist/_locales/**"], {force: true}));

gulp.task("copy", function() {
    return gulp.src("src/**/*")
        .pipe(gulp.dest("../dist/_locales"));
});

gulp.task("build", gulp.series(
    "clean",
    "copy"
));
