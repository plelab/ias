var initialize = function (io, socket) {
    socket.on("message", function (message) {
        console.log("Message from Client : " + message);
        socket.emit("message", "Echo Message : " + message);
        console.log("Echo Message : " + message + " Complete.");
    });
};

var obj = {};
obj.initialize = initialize;

module.exports = obj;

