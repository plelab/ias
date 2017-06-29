var path = require("path");

var status404 = function (err, req, res) {
    res.sendFile(path.join(__dirname, "../www/error/404.html"));
};

var error = {};
error.status404 = status404;

module.exports = error;