module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-rename');
    return {
        dist: {
            files: [{
                src: ['dist/app/lib/firebase/firebase.js'],
                dest: 'dist/app/lib/firebase/firebase.min.js'
            }]
        }
    };
};
