var mysql = require("mysql");

var initialize = function (config) {
    var pool = mysql.createPool({
        connectionLimit: config.mysql.connectionLimit,
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database,
        debug: config.mysql.debug
    });

    return function (req, res, next) {
        pool.getConnection(function (err, conn) {
            req.mysql = conn;

            if (err) {
                console.log(err);
                req.mysql.release();
                return;
            }

            res.origin_json = res.json;

            res.json = function (contents) {
                try {
                    req.mysql.release();
                } catch (err) {
                    console.log("[MySQL_Warning] MySQL Connection Already Release.");
                }

                res.origin_json(contents);
            };

            req.sql = function (query, values, callback) {
                req.mysql.query(query, values, function (err, rows) {
                    if (callback)
                        callback(err, rows);
                });
            };

            next();
        });
    };
};

var obj = {};
obj.initialize = initialize;

module.exports = obj;