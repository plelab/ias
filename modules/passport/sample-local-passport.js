var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt-nodejs");

var strategy = new LocalStrategy({
    usernameField: "user_id",
    passwordField: "passwd",
    passReqToCallback: true
}, function (req, user_id, passwd, done) {
    req.sql("SELECT user_id, passwd FROM users WHERE user_id=?", [user_id], function (err, rows) {
        if (err)
            return done(err);

        if (rows.length == 0)
            return done(null, false, {status: true, code: 1, contents: "User does not exist."});

        if (!bcrypt.compareSync(passwd, rows[0].passwd))
            return done(null, false, {status: true, code: 2, contents: "Password is wrong."});

        return done(null, {user_id: user_id}, {status: true, code: 3, contents: "Login Success."});
    });
});

module.exports = strategy;