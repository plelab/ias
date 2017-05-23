var path = require("path");
var spawn = require("cross-spawn");

var rootPath = path.basename(__dirname);
var tempPath = __dirname.replace(rootPath, "");
var expressPath = "express";

var init = function () {
    spawn.sync("npm", ["install"], {
        stdio: "inherit"
    });

    spawn.sync("bower", ["install"], {
        stdio: "inherit"
    });

    process.chdir(expressPath);

    spawn.sync("npm", ["install"], {
        stdio: "inherit"
    });

    process.chdir("..");

    spawn.sync("gulp", ["build"], {
        stdio: "inherit"
    });
};

var build = function () {
    spawn.sync("gulp", ["build"], {
        stdio: "inherit"
    });
};

var watch = function () {
    spawn.sync("gulp", ["watch"], {
        stdio: "inherit"
    });
};

var run = function () {
    spawn.sync("node", [expressPath + "/www"], {
        stdio: "inherit"
    });
};

if (process.argv.length == 2) {
    run();
    return;
}

switch (process.argv[2]) {
    case "init":
        init();
        break;
    case "build":
        build();
        break;
    case "watch":
        watch();
        break;
    case "run":
        run();
        break;
}