var signin = function () {
    var data = {
        user_id: $("input[name=user_id]").val(),
        passwd: $("input[name=passwd]").val()
    };

    $api.apiList.users.signin(data, function (err, res) {
        if (err || res.status == false) {
            alert("로그인에 실패하였습니다. 관리자에게 문의해주세요.");
            return;
        }

        if (res.code == 1) {
            alert("아이디 또는 패스워드를 확인해주세요.");
            return;
        }

        location.href = "/index.html";
    });
};