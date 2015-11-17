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
            src: ['src/lib'],
            dist: ['dist']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['**'],
                    dest: 'dist/images/'
                }, {
                    expand: true,
                    cwd: 'src/lib',
                    src: [
                        '*/*.min.js',
                        '*/*.min.css',
                        '*/dist/*.min.js',
                        '*/dist/*.min.css',
                        'firebase/firebase.js'
                    ],
                    dest: 'dist/lib/'
                }]
            }
        },
        rename: {
            dist: {
                files: [{
                    src: ['dist/lib/firebase/firebase.js'],
                    dest: 'dist/lib/firebase/firebase.min.js'
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
                    cwd: 'dist/',
                    src: ['index.html'],
                    dest: 'dist/',
                    ext: '.html',
                    extDot: 'first'
                }]
            }
        },
        bower: {
            dist: {
                options: {
                    copy: false
                }
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: /['"]lib\/(.*(?!(\.min|-debug)))\.(js|css)['"]/g,
                        replacement: '"lib/$1.min.$2' +
                                     '?_=<%= new Date().getTime() %>"'
                    }]
                },
                files: [{
                    src: ['src/index.html'],
                    dest: 'dist/index.html'
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
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-rename');
    
    // Custom tasks
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('build', [
        'clean', 'bower', 'copy', 'rename', 'replace'
    ]);
    
    // Default task.
    grunt.registerTask('default', ['lint', 'build']);

};
