var login = function () {
    var data = {
        user_id: $("input[name=user_id]").val(),
        passwd: $("input[name=passwd]").val()
    };

    $api.apiList.users.login(data, function (err, res) {
        if (err)
            $("div.res").append(JSON.stringify(err));
        else
            $("div.res").append(JSON.stringify(res));
    });
};