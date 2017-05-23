var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var pug = require("pug");
var less = require("less");
var gulpUtil = require("gulp-util");

var findFiles = function (rootPath, extension, excludeFiles, res, verbose) {
    if (!fs.existsSync(rootPath))
        return;

    var targetPath = fs.readdirSync(rootPath);

    for (var i = 0; i < targetPath.length; i++) {
        var filePath = path.join(rootPath, targetPath[i]);
        var fileStat = fs.lstatSync(filePath);

        if (fileStat.isDirectory())
            findFiles(filePath, extension, excludeFiles, res, verbose);
        else {
            var flag = false;

            for (var j = 0; j < excludeFiles.length; j++) {
                if (filePath == excludeFiles[j]) {
                    flag = true;
                    break;
                }
            }

            if (flag)
                continue;

            if (verbose)
                console.log("[find] " + filePath);

            if (new RegExp(extension + "$", "gim").test(filePath))
                res.push(filePath);
        }
    }
};

var recursiveRmdir = function (rootPath, excludePath, verbose) {
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

            recursiveRmdir(filePath, excludePath, verbose);
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
            console.log("[%s] %s -> %s", event, filePath.replace(basePath, ""), newPath.replace(basePath, ""));
        } catch (excep) {
            fs.writeFileSync(newPath, JSON.stringify(excep, null, 2), "utf8");
            console.log("[%s_error] %s -> %s", event, filePath.replace(basePath, ""), newPath.replace(basePath, ""));
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
                console.log("[%s] %s -> %s", event, filePath.replace(basePath, ""), newPath.replace(basePath, ""));
            }, function (err) {
                if (!fs.existsSync(path.dirname(newPath)))
                    mkdirp.sync(path.dirname(newPath));

                fs.writeFileSync(newPath, JSON.stringify(err, null, 2), "utf8");
                console.log("[%s_error] %s -> %s", event, filePath.replace(basePath, ""), newPath.replace(basePath, ""));
            });
    }
};

var createPugIncludeTree = function (srcRoot, metaDir, metaFile) {
    var pugFiles = [];
    var pugIncludeTree = {};

    findFiles(srcRoot, ".pug", [], pugFiles, false);

    for (var i = 0; i < pugFiles.length; i++) {
        var includeInfo = readIncludeInfo(pugFiles[i]);

        if (!includeInfo)
            continue;

        parseIncludeInfo(pugFiles[i], includeInfo);
        createIncludeTree(pugFiles[i], includeInfo, pugIncludeTree);
    }

    if (!fs.existsSync(metaDir))
        mkdirp.sync(metaDir);

    fs.writeFileSync(path.join(metaDir, "pug-tree.json"), JSON.stringify(pugIncludeTree), "utf8");
};

var readIncludeInfo = function (filePath) {
    var contents = fs.readFileSync(filePath, "utf8");
    contents = contents.replace(/[\/]{2,}[\s\t]*include[\s\t]+[^\n]{1,}/gim, "");
    var includeInfo = contents.match(/include[\s\t]+[^\n]{1,}/gim);

    return includeInfo;
};

var parseIncludeInfo = function (filePath, info) {
    for (var i = 0; i < info.length; i++) {
        info[i] = (/include[\s\t]+([^\n]{1,})/gim).exec(info[i])[1];
        info[i] = path.join(path.dirname(filePath), info[i]);
    }
};

var createIncludeTree = function (filePath, info, res) {
    for (var i = 0; i < info.length; i++) {
        if (res.hasOwnProperty(info[i]))
            res[info[i]].push(filePath);
        else
            res[info[i]] = [filePath];
    }
};

var util = {};
util.findFiles = findFiles;
util.recursiveRmdir = recursiveRmdir;
util.compileFiles = compileFiles;
util.createPugIncludeTree = createPugIncludeTree;

module.exports = util;