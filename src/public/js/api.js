var $api = {
    apiUrl: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""),
    apiList: {
        sample: {
            get: function (query, callback) {
                var apiPath = "/api/sampleAjax";

                $ajax.request($api.apiUrl + apiPath, {method: "GET", data: query}, function (err, res) {
                    callback(err, res);
                });
            },
            post: function (query, callback) {
                var apiPath = "/api/sampleAjax";

                $ajax.request($api.apiUrl + apiPath, {method: "POST", data: query}, function (err, res) {
                    callback(err, res);
                });
            }
        },
        users: {
            signin: function (query, callback) {
                var apiPath = "/api/users/signin";

                $ajax.request($api.apiUrl + apiPath, {method: "POST", data: query}, function (err, res) {
                    callback(err, res);
                });
            },
            signup: function (query, callback) {
                var apiPath = "/api/users/signup";

                $ajax.request($api.apiUrl + apiPath, {method: "POST", data: query}, function (err, res) {
                    callback(err, res);
                });
            },
            session: function (query, callback) {
                var apiPath = "/api/users/session";

                $ajax.request($api.apiUrl + apiPath, {method: "GET", data: query}, function (err, res) {
                    callback(err, res);
                });
            },
            signout: function (query, callback) {
                var apiPath = "/api/users/signout";

                $ajax.request($api.apiUrl + apiPath, {method: "GET", data: query}, function (err, res) {
                    callback(err, res);
                });
            }
        }
    }
};