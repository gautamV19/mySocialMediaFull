const gulp = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev");

gulp.task("css", function () {
  console.log("minifying css");
  gulp
    .src("./assets/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest("./assets/css"));

  return gulp
    .src("./assets/**/*.css")
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(rev.manifest({ cwd: "public", merge: true }))
    .pipe(gulp.dest("./public/assets"));
});
