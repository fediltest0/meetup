module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    return {
        dist: {
            files: [{
                expand: true,
                cwd: 'src/app',
                src: ['index.html'],
                dest: 'dist/app/'
            }, {
                expand: true,
                cwd: 'src/app/images',
                src: ['**'],
                dest: 'dist/app/images/'
            }, {
                expand: true,
                cwd: 'src/app/partials',
                src: ['**'],
                dest: 'dist/app/partials/'
            }, {
                expand: true,
                cwd: 'src/app/lib',
                src: [
                    '*/*.min.js',
                    '*/*.min.css',
                    '*/dist/*.min.js',
                    '*/dist/*.min.css',
                    'firebase/firebase.js'
                ],
                dest: 'dist/app/lib/'
            }]
        }
    };
};
