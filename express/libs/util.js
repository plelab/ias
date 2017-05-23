var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var pug = require("pug");
var less = require("less");
var gulpUtil = require("gulp-util");

var dirTraversal = function (rootPath, paths, verbose) {
    if (!fs.existsSync(rootPath))
        return;

    var targetPath = fs.readdirSync(rootPath);

    for (var i = 0; i < targetPath.length; i++) {
        var filePath = path.join(rootPath, targetPath[i]);
        var fileStat = fs.lstatSync(filePath);

        if (fileStat.isDirectory())
            dirTraversal(filePath, paths);
        else {
            if (verbose)
                console.log("[Traversal] " + filePath);

            paths.push(filePath);
        }
    }
};

var dirRemoveTraversal = function (rootPath, excludePath, verbose) {
    if (!fs.existsSync(rootPath))
        return;

    var targetPath = fs.readdirSync(rootPath);

    for (var i = 0; i < targetPath.length; i++) {
        var filePath = path.join(rootPath, targetPath[i]);
        var fileStat = fs.lstatSync(filePath);

        if (fileStat.isDirectory()) {
            var flag = false;

            for (var j = 0; j < excludePath.length; j++) {
                if (filePath == excludePath[j]) {
                    flag = true;
                    break;
                }
            }

            if (flag)
                continue;

            dirRemoveTraversal(filePath, excludePath, verbose);
        }
        else {
            if ((/\.html$/gim).test(filePath) || (/\.css$/gim).test(filePath)) {
                if (verbose)
                    console.log("[remove] " + filePath);

                fs.unlinkSync(filePath);
            }
        }

        if (fs.readdirSync(rootPath).length == 0)
            fs.rmdir(rootPath);
    }
};

var compileFiles = function (event, filePath, basePath, srcRoot, dstPath) {
    if ((/\.pug/gim).test(filePath)) {
        try {
            var newPath = gulpUtil.replaceExtension(filePath, ".html").replace(basePath + "/" + srcRoot, basePath + "/" + dstPath);

            if (!fs.existsSync(path.dirname(newPath)))
                mkdirp.sync(path.dirname(newPath));

            fs.writeFileSync(newPath, pug.compileFile(filePath)(), "utf8");
            console.log("[%s] %s -> %s", event, filePath.replace(basePath, ""), newPath);
        } catch (excep) {
            fs.writeFileSync(newPath, JSON.stringify(excep, null, 2), "utf8");
            console.log("[%s_error] %s -> %s", event, filePath.replace(basePath, ""), newPath);
        }
    }
    else if ((/\.less/gim).test(filePath)) {
        var contents = fs.readFileSync(filePath, "utf8");
        var newPath = gulpUtil.replaceExtension(filePath, ".css").replace(basePath + "/" + srcRoot, basePath + "/" + dstPath);

        less.render(contents, {compress: true})
            .then(function (output) {
                if (!fs.existsSync(path.dirname(newPath)))
                    mkdirp.sync(path.dirname(newPath));

                fs.writeFileSync(newPath, output.css, "utf8");
                console.log("[%s] %s -> %s", event, filePath.replace(basePath, ""), newPath);
            }, function (err) {
                if (!fs.existsSync(path.dirname(newPath)))
                    mkdirp.sync(path.dirname(newPath));

                fs.writeFileSync(newPath, JSON.stringify(err, null, 2), "utf8");
                console.log("[%s_error] %s -> %s", event, filePath.replace(basePath, ""), newPath);
            });
    }
};

var util = {};
util.dirTraversal = dirTraversal;
util.dirRemoveTraversal = dirRemoveTraversal;
util.compileFiles = compileFiles;

module.exports = util;