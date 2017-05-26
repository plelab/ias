$(document).ready(function () {
    $api.apiList.users.session({}, function (err, res) {
        if (err || res.status == false) {
            alert("세션 확인에 실패하였습니다. 관리자에게 문의해주세요.");
            location.href = "/signin/signin.html";
            return;
        }

        if (res.code == 2) {
            location.href = "/signin/signin.html";
            alert("로그인이 필요합니다.");
        }
    });
});