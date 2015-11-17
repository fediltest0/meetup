module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            build: {
                options: {
                    node: true
                },
                files: {
                    src: ['Gruntfile.js']
                }
            },
            src: {
                options: {
                    browser: true
                },
                files: {
                    src: ['src/**.js']
                }
            }
        },
        jscs: {
            build: 'Gruntfile.js',
            src: 'src/**.js',
            options: {
                config: '.jscsrc',
                verbose: true
            }
        },
        clean: {
            dist: ['dist']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['**'],
                    dest: 'dist/images/'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['index.html'],
                    dest: 'dist/',
                    ext: '.html',
                    extDot: 'first'
                }]
            }
        }
    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    
    // Custom tasks
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('build', ['clean', 'copy', 'htmlmin']);
    
    // Default task.
    grunt.registerTask('default', ['lint', 'build']);

};
