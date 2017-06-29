var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    if (req.isAuthenticated())
        res.json({status: true, code: 1, contents: "Session Valid."});
    else
        res.json({status: true, code: 2, contents: "Session Invalid."});
});

module.exports = router;
