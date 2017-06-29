var express = require("express");
var router = express.Router();

var multer = require("../modules/multer");

router.post("/", multer.upload.array("picture", 1), function (req, res, next) {
    res.json(req.files);
});

module.exports = router;
