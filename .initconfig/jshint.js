module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    return {
        build: {
            options: {
                node: true
            },
            files: {
                src: ['Gruntfile.js', 'karma.conf.js', '.initconfig/*.js']
            }
        },
        src: {
            options: {
                jshintrc: true
            },
            files: {
                src: ['src/app/js/**/*.js']
            }
        },
        test: {
            options: {
                jshintrc: true
            },
            files: {
                src: ['test/app/js/**/*.js']
            }
        }
    };
};
