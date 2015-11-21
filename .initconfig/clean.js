module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    return {
        src: ['src/app/lib'],
        dist: ['dist'],
        test: ['coverage']
    };
};
