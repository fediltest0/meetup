module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-processhtml');
    return {
        dist: {
            files: {
                'dist/app/index.html': ['dist/app/index.html']
            }
        }
    };
};
