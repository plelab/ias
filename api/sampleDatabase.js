var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    req.sql("SELECT * FROM users", function (err, rows) {
        if (err) {
            res.send({status: false, code: 1, contents: err});
            return;
        }

        res.send({status: true, code: 1, contents: rows});
    });
});

module.exports = router;
