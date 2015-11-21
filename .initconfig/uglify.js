module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    return {
        dist: {
            files: {
                'dist/app/js/app.min.js': [
                    'src/app/js/app.js',
                    'src/app/js/**/*.js'
                ]
            }
        }
    };
};
