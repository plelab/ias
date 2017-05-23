/* Modules */
var fs = require("fs");
var app = require("./app");
var http = require("http");

/* Configuration Loading */
var config = JSON.parse(fs.readFileSync("./express/config.json"));

/* Configuration */
var port = config.express.port;
app.set('port', port);

/* Listening */
var server = http.createServer(app);
server.listen(port);

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