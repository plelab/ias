var express = require("express");
var router = express.Router();

var UserSchema = require("../modules/schema/user");

router.get("/", function (req, res, next) {
    var UserModel = req.mongoose.model("user", UserSchema);

    var user = new UserModel({
        user_id: "id",
        passwd: "passwd"
    });

    user.save(function (err, info) {
        if (err) {
            res.send({status: false, code: 1, contents: err});
            return;
        }

        res.send({status: true, code: 1, contents: info});
    });
});

module.exports = router;
