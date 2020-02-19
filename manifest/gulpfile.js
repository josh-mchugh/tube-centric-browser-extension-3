var gulp = require("gulp");
var del = require("del");

gulp.task("clean", del.bind(null, ["../dist/manifest/**"], {force: true}));

gulp.task("copy", function() {
    return gulp.src("src/**/*")
        .pipe(gulp.dest("../dist"));
});

gulp.task("build", gulp.series(
    "clean",
    "copy"
));
