module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma-coveralls');
    return {
        options: {
            debug: false,
            coverageDir: 'coverage',
            dryRun: !process.env.TRAVIS,
            force: true,
            recursive: true
        }
    };
};
