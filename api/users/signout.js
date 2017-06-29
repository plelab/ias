var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    req.logOut();
    res.json({status: true, code: 1, contents: "Session Destroy."});
});

module.exports = router;
