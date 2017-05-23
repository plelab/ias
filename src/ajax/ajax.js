var ajaxGetSample = function () {
    $ajax.request("http://localhost:27018/api/sampleAjax", {
        method: "GET",
        data: {ajax: "GET Sample"}
    }, function (err, res) {
        if (err)
            $("div.get_res").append(JSON.stringify(err));
        else
            $("div.get_res").append(JSON.stringify(res));
    });
};

var ajaxPostSample = function () {
    $ajax.request("http://localhost:27018/api/sampleAjax", {
        method: "POST",
        data: {ajax: "POST Sample"}
    }, function (err, res) {
        if (err)
            $("div.post_res").append(JSON.stringify(err));
        else
            $("div.post_res").append(JSON.stringify(res));
    });
};