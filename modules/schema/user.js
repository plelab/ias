var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    user_id: String,
    passwd: String,
    user_name: String,
    birth: String,
    gender: String,
    phone: String,
    email: String
});

module.exports = schema;
