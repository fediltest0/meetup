module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-jscs');
    return {
        build: ['Gruntfile.js', 'karma.conf.js', '.initconfig/*.js'],
        src: 'src/app/js/**/*.js',
        test: 'test/app/js/**/*.js',
        options: {
            config: '.jscsrc',
            verbose: true
        }
    };
};
