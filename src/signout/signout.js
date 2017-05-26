var signout = function () {
    var data = {
        user_id: $("input[name=user_id]").val(),
        passwd: $("input[name=passwd]").val()
    };

    $api.apiList.users.signout({}, function (err, res) {
        if (err || res.status == false) {
            alert("로그아웃에 실패하였습니다. 관리자에게 문의해주세요.");
            return;
        }

        location.href = "/index.html";
    });
};