var $api = {
    apiUrl: "http://localhost:27018",
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
            login: function (query, callback) {
                var apiPath = "/api/sampleLocalPassport";

                $ajax.request($api.apiUrl + apiPath, {method: "POST", data: query}, function (err, res) {
                    callback(err, res);
                });
            }
        }
    }
};