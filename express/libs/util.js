var fs = require("fs");
var path = require("path");

var dirTraversal = function (rootPath, paths) {
    var targetPath = fs.readdirSync(rootPath);

    for (var i = 0; i < targetPath.length; i++) {
        var filePath = path.join(rootPath, targetPath[i]);
        var fileStat = fs.lstatSync(filePath);

        if (fileStat.isDirectory())
            dirTraversal(filePath, paths);
        else
            paths.push(filePath);
    }
};

var util = {};
util.dirTraversal = dirTraversal;

module.exports = util;