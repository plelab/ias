/* Modules */
var fs = require("fs");
var app = require("./app");
var http = require("http");
var socketio = require("socket.io");
var socket = require("../modules/socket");

/* Configuration Loading */
var config = JSON.parse(fs.readFileSync("./express/config.json"));

/* Configuration */
var port = config.express.port;
app.set('port', port);

/* Listening */
var server = http.createServer(app);
server.listen(port);

/* WebSocket Listening */
var io = socketio.listen(server);
socket.initialize(io);

/* Event Registration */
server.on('error', onError);
server.on('listening', onListening);

/* Event Method */
function onError(error) {
    console.log(error.stack);
    process.exit(1);
}

function onListening() {
    var addr = server.address();

    if (addr.address === "::")
        addr.address = "http://localhost";

    console.log("Listening on " + addr.address + ":" + port);
}