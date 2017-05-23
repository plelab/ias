var status404 = function (err, req, res) {
    res.status(err.status).redirect("/error/404.html");
};

var error = {};
error.status404 = status404;

module.exports = error;