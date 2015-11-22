module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-http-server');
    return {
        e2e: {
            root: 'dist/',
            port: 8282,
            host: "0.0.0.0",
            runInBackground: true
        }
    };
};
