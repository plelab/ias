var path = require("path");
var spawn = require("cross-spawn");

var rootPath = path.basename(__dirname);
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
};

var clean = function () {
    spawn.sync("gulp", ["clean"], {
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

var help = function () {
    console.log("Usage : node ias-cli.js [command]");
    console.log("Command List : ");
    console.log("init : Project initialization.(npm install, bower install, Angular2 Init)");
    console.log("clean : Build Directory, distribution directory clean.(exclude node_modules)");
    console.log("build : build of pug, less files.");
    console.log("watch : Tracking src directory.");
    console.log("run : Execution of web server.(Distribution Version.)");
    console.log("help : ias-cli help.");
};

if (process.argv.length == 2) {
    help();
    return;
}

switch (process.argv[2]) {
    case "init":
        init();
        break;
    case "clean":
        clean();
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
    case "help":
        help();
        break;
}