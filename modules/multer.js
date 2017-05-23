var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var multer = require("multer");

var expressPath = "express";
var serviceConfig = JSON.parse(fs.readFileSync(path.join(expressPath, "config.json"), "utf8"));

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (!fs.existsSync(serviceConfig.file.destination))
            mkdirp.sync(serviceConfig.file.destination);

        callback(null, serviceConfig.file.destination);
    },
    filename: function (req, file, callback) {
        var extName = path.extname(file.originalname);
        var baseName = path.basename(file.originalname, extName);
        callback(null, baseName + "_" + Date.now() + extName);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        files: serviceConfig.file.fileLimit,
        fileSize: serviceConfig.file.fileSizeLimit
    }
});

var __multer = {};
__multer.upload = upload;

module.exports = __multer;