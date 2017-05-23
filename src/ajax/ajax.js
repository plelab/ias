var ajaxGetSample = function () {
    var data = {ajax: "GET Sample"};

    $api.apiList.sample.get(data, function (err, res) {
        if (err)
            $("div.get_res").append(JSON.stringify(err));
        else
            $("div.get_res").append(JSON.stringify(res));
    });
};

var ajaxPostSample = function () {
    var data = {ajax: "POST Sample"};

    $api.apiList.sample.post(data, function (err, res) {
        if (err)
            $("div.post_res").append(JSON.stringify(err));
        else
            $("div.post_res").append(JSON.stringify(res));
    });
};