var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
    req.passport.authenticate("sample-passport", function (err, user, info) {
        res.send(info);
    })(req, res, next);
});

module.exports = router;
