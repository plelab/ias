var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    user_id: String,
    passwd: String
});

module.exports = schema;
