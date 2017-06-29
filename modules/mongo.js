var mongoose = require("mongoose");

var initialize = function (config) {
    return function (req, res, next) {
        var conn = mongoose.createConnection(config.mongo.host + ":" + config.mongo.port + "/" + config.mongo.database);

        conn.on("error", console.error.bind(console, "Mongoose Connection Error!"));
        conn.on("open", function () {
            req.mongoose = conn;
            res.origin_json = res.json;

            res.json = function (contents) {
                try {
                    req.mongoose.close();
                } catch (err) {
                    console.log(err);
                }

                res.origin_json(contents);
            };

            next();
        });
    };
};

var obj = {};
obj.initialize = initialize;

module.exports = obj;