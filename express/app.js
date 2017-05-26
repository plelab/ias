/* Import Library */
var fs = require("fs");
var path = require("path");
var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var RedisStore = require("connect-redis")(session);
var Redis = require("ioredis");
var passport = require("passport");
var flash = require("connect-flash");
var cors = require("cors");

/* Import User Library */
var util = require("../modules/util");
var mysql = require("../modules/mysql");
var mongo = require("../modules/mongo");
var passportConfig = require("../modules/passport");

/* Define User Settings */
var expressPath = "express";
var serviceConfig = JSON.parse(fs.readFileSync(path.join(expressPath, "config.json"), "utf8"));

/* Getting App Object */
var app = express();

/* Setting Static Directory */
app.use(express.static(path.join(__dirname.replace(new RegExp(expressPath + "$", "gim"), ""), "www")));

/* Setting Cookie / Body Parser */
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* Setting Database */
if (serviceConfig.mysql.use)
    app.use(mysql.initialize(serviceConfig));

if (serviceConfig.mongo.use)
    app.use(mongo.initialize(serviceConfig));

/* Setting Cross Domain Issue */
app.use(cors());

/* Setting Redis Session */
app.use(session({
    store: new RedisStore({client: new Redis(serviceConfig.redis)}),
    secret: serviceConfig.session.secret,
    resave: serviceConfig.session.resave,
    saveUninitialized: serviceConfig.session.saveUninitialized
}));

/* Setting Passport */
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(passportConfig.initialize(passport));

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
