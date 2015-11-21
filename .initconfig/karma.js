module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    return {
        test: {
            configFile: 'karma.conf.js'
        }
    };
};
