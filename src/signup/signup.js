var signup = function () {
    var data = {
        user_id: $("input[name=user_id]").val(),
        passwd: $("input[name=passwd]").val(),
        chkPasswd: $("input[name=chkPasswd]").val(),
        user_name: $("input[name=user_name]").val(),
        birth: $("input[name=birth]").val(),
        gender: $("input[name=gender]").val(),
        phone: $("input[name=phone]").val(),
        email: $("input[name=email]").val()
    };

    if (data.passwd != data.chkPasswd) {
        alert("패스워드와 패스워드 확인이 일치하지 않습니다.");
        return;
    }

    var keys = Object.keys(data);

    for (var i = 0; i < keys.length; i++) {
        if (data[keys[i]] == "") {
            alert("빈 칸을 전부 입력해주세요.");
            return;
        }
    }

    $api.apiList.users.signup(data, function (err, res) {
        if (err || res.status == false) {
            alert("회원가입에 실패하였습니다. 관리자에게 문의해주세요.");
            return;
        }

        alert("회원가입이 완료되었습니다.");
        location.href = "/signin/signin.html";
    });
};