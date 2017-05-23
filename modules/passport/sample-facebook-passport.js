var fs = require("fs");
var path = require("path");
var FacebookStrategy = require("passport-facebook").Strategy;

var expressPath = "express";
var serviceConfig = JSON.parse(fs.readFileSync(path.join(expressPath, "config.json"), "utf8"));

var strategy = new FacebookStrategy({
    clientID: serviceConfig.auth.facebook.clientID,
    clientSecret: serviceConfig.auth.facebook.clientSecret,
    callbackURL: serviceConfig.auth.facebook.callbackURL
}, function (accessToken, refreshToken, profile, done) {
    done(null, profile, {status: true, code: 1, contents: "Login Success."});
});

module.exports = strategy;