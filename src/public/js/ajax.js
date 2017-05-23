var $ajax = {
    request: function (url, options, callback) {
        $ajax.parseOptions(options);
        $ajax.parseData(options);

        $.ajax({
            url: url,
            method: options.method,
            data: options.data
        })
            .done(function (data, textStatus, jqXHR) {
                callback(null, data);
            })
            .fail(function (jqXHR, textStatus, err) {
                callback(err, null);
            });
    },
    parseOptions: function (options) {
        options = options || {};

        var defaultOptions = {
            method: "GET",
            data: {},
            stringify: false
        };

        var keys = Object.keys(defaultOptions);

        for (var i = 0; i < keys.length; i++)
            options[keys[i]] = (typeof options[keys[i]] === "undefined") ? defaultOptions[keys[i]] : options[keys[i]];
    },
    parseData: function (options) {
        if (options.stringify)
            options.data = {data: JSON.stringify(options.data)};
    }
};