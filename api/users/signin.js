var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
    req.passport.authenticate("sample-local-passport", function (err, user, info) {
        if (err) {
            res.json({status: false, code: 1, err: err});
            return;
        }

        if (!user) {
            res.json({status: true, code: 1, contents: info});
            return;
        }

        req.logIn(user, function () {
            res.json({status: true, code: 2, contents: info});
        });
    })(req, res, next);
});

module.exports = router;
