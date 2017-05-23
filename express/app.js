/* Import Library */
var path = require("path");
var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash");

/* Import User Library */
var util = require("../modules/util");
var passportConfig = require("../modules/passport/passportConfig");

/* Getting App Object */
var app = express();

/* Setting Static Directory */
var expressPath = "express";
app.use(express.static(path.join(__dirname.replace(new RegExp(expressPath + "$", "gim"), ""), "www")));

/* Setting Cookie / Body Parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/* Setting Passport */
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passportConfig.init(passport);
app.use(passportConfig.middleware(passport));

var apiList = [];
util.findFiles("./api", ".js", [], apiList, false);

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

    var error = require("../modules/error");
    var handler = "status" + err.status;

    if (error.hasOwnProperty("status" + err.status)) {
        error[handler](err, req, res);
        return;
    }

    res.send({"status": 500, "message": err.message, "stack": err.stack});
});

module.exports = app;
