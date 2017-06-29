var express = require("express");
var router = express.Router();

var bcrypt = require("bcrypt-nodejs");

var UserSchema = require("../../modules/schema/user");

router.post("/", function (req, res, next) {
    var data = req.body;

    var salt = bcrypt.genSaltSync(10);
    data.passwd = bcrypt.hashSync(data.passwd, salt);

    var UserModel = req.mongoose.model("user", UserSchema);
    var user = new UserModel(data);

    user.save(function (err, info) {
        if (err) {
            res.json({status: false, code: 1, contents: err});
            return;
        }

        res.json({status: true, code: 1, contents: info});
    });
});

module.exports = router;
