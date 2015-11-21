module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-bower-task');
    return {
        dist: {
            options: {
                copy: false
            }
        }
    };
};
