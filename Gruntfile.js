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
                    src: ['Gruntfile.js', 'karma.conf.js']
                }
            },
            src: {
                options: {
                    jshintrc: true
                },
                files: {
                    src: ['src/js/**/*.js']
                }
            },
            test: {
                options: {
                    jshintrc: true
                },
                files: {
                    src: ['test/js/**/*.js']
                }
            }
        },
        jscs: {
            build: ['Gruntfile.js', 'karma.conf.js'],
            src: 'src/js/**/*.js',
            test: 'test/js/**/*.js',
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
                    cwd: 'src',
                    src: ['index.html'],
                    dest: 'dist/'
                }, {
                    expand: true,
                    cwd: 'src/images',
                    src: ['**'],
                    dest: 'dist/images/'
                }, {
                    expand: true,
                    cwd: 'src/partials',
                    src: ['**'],
                    dest: 'dist/partials/'
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
                    src: ['index.html', 'partials/*.html'],
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
                    src: ['dist/index.html'],
                    dest: 'dist/index.html'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/app.min.js': [
                        'src/js/app.js',
                        'src/js/**/*.js'
                    ]
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html': ['src/index.html']
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/css/style.min.css': ['src/css/**/*.css']
                }
            }
        },
        karma: {
            test: {
                configFile: 'karma.conf.js'
            }
        }
    });
    
    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-karma');
    
    // Custom tasks
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('build', [
        'clean:dist', 'bower', 'copy', 'rename', 'replace', 'processhtml',
        'uglify', 'cssmin', 'htmlmin'
    ]);
    grunt.registerTask('test', ['karma']);
    
    // Default task.
    grunt.registerTask('default', ['lint', 'build', 'test']);

};
