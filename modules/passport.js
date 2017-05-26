var path = require("path");
var util = require("./util");

var passportPath = "modules/passport";
var passportRoot = "passport";

var initialize = function (passport) {
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
        var passportMappingPath = "./" + passportRoot + "/" + passportName;
        passport.use(passportName, require(passportMappingPath));
        console.log("[passport] %s(%s)", passportName, passportMappingPath + ".js");
    }

    return function (req, res, next) {
        req.passport = passport;
        next();
    }
};

var passportConfig = {};
passportConfig.initialize = initialize;

module.exports = passportConfig;