module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-protractor-runner');
    return {
        options: {
            configFile: "node_modules/protractor/example/conf.js",
            keepAlive: false,
            noColor: false,
            webdriverManagerUpdate: true,
            args: {}
        },
        all: {
            options: {
                configFile: "protractor.conf.js",
                args: {}
            }
        }
    };
};
