var path = require("path");
var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var pug = require("pug");
var less = require("less");
var through2 = require("through2");

gulp.task("views", function buildHTML() {
    return gulp.src("./src/**/*")
        .pipe(through2.obj(function (file, encoding, callback) {
            if ((/\.pug/gim).test(file.path)) {
                file.contents = new Buffer(pug.compileFile(file.path)());
                file.path = gulpUtil.replaceExtension(file.path, ".html");
                callback(null, file);
            }
            else if ((/\.less/gim).test(file.path)) {
                file.path = gulpUtil.replaceExtension(file.path, ".css");
                less.render(String(file.contents), {})
                    .then(function (output) {
                        file.contents = new Buffer(output.css);
                        callback(null, file);
                    }, function (err) {
                        callback(null, file);
                    });
            }
            else
                callback(null, file);
        }))
        .pipe(gulp.dest("./www"));
});