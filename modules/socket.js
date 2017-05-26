var path = require("path");
var util = require("./util");

var socketModulesPath = "modules/socket";
var socketModulesRoot = "socket";

var initialize = function (io) {
    io.sockets.on("connection", function (socket) {
        var socketModules = [];
        util.findFiles(socketModulesPath, ".js", [], socketModules, false);

        for (var i = 0; i < socketModules.length; i++) {
            var socketModuleName = path.basename(socketModules[i]).replace(/.js$/gim, "");
            var socketModulePath = "./" + socketModulesRoot + "/" + socketModuleName;
            var socketModule = require("./" + socketModulesRoot + "/" + socketModuleName);

            socketModule.initialize(io, socket);

            console.log("[socket] %s(%s)", socketModuleName, socketModulePath + ".js");
        }
    });
};

var obj = {};
obj.initialize = initialize;

module.exports = obj;