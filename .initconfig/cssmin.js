var files = {
    'dist/app/css/style.min.css': ['src/app/css/**/*.css'],
    'dist/app/lib/angular-material-icons/angular-material-icons.min.css': [
        'src/app/lib/angular-material-icons/angular-material-icons.css'
    ]
};

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    return {
        dist: {
            files: files
        }
    };
};
