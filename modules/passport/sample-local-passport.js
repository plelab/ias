var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt-nodejs");

var UserSchema = require("../schema/user");

var strategy = new LocalStrategy({
    usernameField: "user_id",
    passwordField: "passwd",
    passReqToCallback: true
}, function (req, user_id, passwd, done) {
    var UserModel = req.mongoose.model("user", UserSchema);

    UserModel.find({"user_id": user_id}, function (err, results) {
        if (err)
            return done(err);

        if (results.length == 0)
            return done(null, false, {status: true, code: 1, contents: "ID or Password is incorrect."});

        if (!bcrypt.compareSync(passwd, results[0]._doc.passwd))
            return done(null, false, {status: true, code: 2, contents: "ID or Password is incorrect."});

        return done(null, {"user_id": user_id}, {status: true, code: 3, contents: "Login Success."});
    });
});

module.exports = strategy;