var LocalStrategy = require("passport-local").Strategy;

var strategy = new LocalStrategy({
    usernameField: "user_id",
    passwordField: "passwd",
    passReqToCallback: true
}, function (req, user_id, passwd, done) {
    if (user_id == "id" && passwd == "password")
        return done(null, {user_id: user_id}, {status: true, code: 1, contents: "Login Success."});
    else if (user_id != "id")
        return done(null, false, {status: true, code: 2, contents: "User Not Exist."});
    else if (passwd != "password")
        return done(null, false, {status: true, code: 3, contents: "Wrong Password."});
});

module.exports = strategy;