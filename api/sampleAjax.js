var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.send({status: true, code: 1, contents: req.query});
});

router.post("/", function (req, res, next) {
    res.send({status: true, code: 1, contents: req.body});
});

module.exports = router;
