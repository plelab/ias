var fs = require("fs");
var path = require("path");
var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var gulpWatch = require("gulp-watch");
var pug = require("pug");
var less = require("less");
var through2 = require("through2");
var util = require("./express/libs/util");

var srcPath = ["./src/**/*"];
var srcRoot = "src";
var dstPath = "www";
var bowerPath = "./.bowerrc";

gulp.task("default", ["build", "watch"]);

gulp.task("clean", function () {
    var bowerPath = JSON.parse(fs.readFileSync(".bowerrc", "utf8"));
    util.dirRemoveTraversal(dstPath, [bowerPath.directory], true);
});

gulp.task("build", ["clean"], function () {
    return gulp.src(srcPath)
        .pipe(through2.obj(function (file, encoding, callback) {
            if ((/\.pug/gim).test(file.path)) {
                try {
                    var filePath = file.path;
                    var newPath = gulpUtil.replaceExtension(file.path, ".html");

                    file.path = newPath;
                    file.contents = new Buffer(pug.compileFile(filePath)());

                    console.log("[build] %s -> %s", file.path.replace(__dirname, ""), newPath.replace(__dirname + "/" + srcRoot, "/" + dstPath));
                } catch (excep) {
                    file.contents = new Buffer(JSON.stringify(excep, null, 2));
                    console.log("[build_error] %s -> %s", file.path.replace(__dirname, ""), newPath.replace(__dirname + "/" + srcRoot, "/" + dstPath));
                }

                callback(null, file);
            }
            else if ((/\.less/gim).test(file.path)) {
                var newPath = gulpUtil.replaceExtension(file.path, ".css");

                file.path = newPath;
                less.render(String(file.contents), {compress: true})
                    .then(function (output) {
                        file.contents = new Buffer(output.css);
                        console.log("[build] %s -> %s", file.path.replace(__dirname, ""), newPath.replace(__dirname + "/" + srcRoot, "/" + dstPath));
                        callback(null, file);
                    }, function (err) {
                        file.contents = new Buffer(JSON.stringify(err, null, 2));
                        console.log("[build_error] %s -> %s", file.path.replace(__dirname, ""), newPath.replace(__dirname + "/" + srcRoot, "/" + dstPath));
                        callback(null, file);
                    });
            }
            else
                callback(null, file);
        }))
        .pipe(gulp.dest(dstPath));
});

gulp.task("watch", ["build"], function () {
    return gulpWatch(srcRoot, function (event) {
        util.compileFiles(event.event, event.history[0], event.base, srcRoot, dstPath);
    });
});