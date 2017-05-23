var path = require("path");
var util = require("./util");

var passportPath = "modules/passport";
var passportRoot = "passport";

var init = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    var passportList = [];
    util.findFiles(passportPath, ".js", [], passportList, false);

    for (var i = 0; i < passportList.length; i++) {
        var passportName = path.basename(passportList[i]).replace(/.js$/gim, "");
        passport.use(passportName, require("./" + passportRoot + "/" + passportName));
        console.log("[passport] %s(%s)", passportName, "./" + passportName);
    }
};

var middleware = function (passport) {
    return function (req, res, next) {
        req.passport = passport;
        next();
    }
};

var passportConfig = {};
passportConfig.init = init;
passportConfig.middleware = middleware;

module.exports = passportConfig;