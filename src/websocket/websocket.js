var socket = null;

var connect = function () {
    var host = $("#host").val();
    var port = $("#port").val();

    var socketUrl = "http://" + host + ":" + port;

    socket = io.connect(socketUrl, {"forceNew": true});

    socket.on("connect", function () {
        $(".connect_res").append(socketUrl + " Connected.");
    });

    socket.on("disconnect", function () {
        $(".connect_res").append(socketUrl + " disconnected.");
    });

    socket.on("message", function (message) {
        $(".recv_res").append("Message From Server : " + message);
    });
};

var sendMessage = function () {
    socket.emit("message", $("#msg").val());
    $(".send_res").append($("#msg").val() + " Send Complete.");
};