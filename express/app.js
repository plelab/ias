/* Import Library */
var path = require("path");
var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var util = require("./libs/util");

/* Getting App Object */
var app = express();

/* Setting Static Directory */
var expressPath = "express";
app.use(express.static(path.join(__dirname.replace(new RegExp(expressPath + "$", "gim"), ""), "www")));

/* Setting Cookie / Body Parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var apiList = [];
util.dirTraversal("./api", apiList, false);

for (var i = 0; i < apiList.length; i++) {
    var routePath = path.join("/", apiList[i]).replace(/\.js$/gim, "");
    var apiPath = "../" + apiList[i];
    app.use(routePath, require(apiPath));
    console.log("[api] %s(%s)", routePath, apiPath);
}

/* Status 404(Page Not Found) Error */
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

/* Error Handling */
app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    var error = require("./libs/error");
    var handler = "status" + err.status;

    if (error.hasOwnProperty("status" + err.status)) {
        error[handler](err, req, res);
        return;
    }

    res.status(err.status).send({"status": 500, "message": err.message, "stack": err.stack});
});

module.exports = app;