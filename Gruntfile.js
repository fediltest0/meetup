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
                    src: ['src/app/js/**/*.js']
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
            src: 'src/app/js/**/*.js',
            test: 'test/app/js/**/*.js',
            options: {
                config: '.jscsrc',
                verbose: true
            }
        },
        clean: {
            src: ['src/app/lib'],
            dist: ['dist'],
            test: ['coverage']
        },
        copy: {
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
        },
        rename: {
            dist: {
                files: [{
                    src: ['dist/app/lib/firebase/firebase.js'],
                    dest: 'dist/app/lib/firebase/firebase.min.js'
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
                    cwd: 'dist/app/',
                    src: ['index.html', 'partials/*.html'],
                    dest: 'dist/app/',
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
                    src: ['dist/app/index.html'],
                    dest: 'dist/app/index.html'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/app/js/app.min.js': [
                        'src/app/js/app.js',
                        'src/app/js/**/*.js'
                    ]
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/app/index.html': ['src/app/index.html']
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/app/css/style.min.css': ['src/app/css/**/*.css']
                }
            }
        },
        karma: {
            test: {
                configFile: 'karma.conf.js'
            }
        },
        coveralls: {
            options: {
                debug: false,
                coverageDir: 'coverage',
                dryRun: !process.env.TRAVIS,
                force: true,
                recursive: true
            }
        },
        ngdocs: {
            options: {
                dest: 'dist/docs',
                startPage: '/api',
                title: '<%= pkg.name %>',
                image: 'src/app/images/favicon.png',
                imageLink: '<%= pkg.homepage %>'
            },
            tutorial: {
                src: ['src/docs/tutorial/*.ngdoc'],
                title: 'Tutorial'
            },
            api: {
                src: ['src/app/js/**/*.js'],
                title: 'API Documentation'
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
    grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.loadNpmTasks('grunt-ngdocs');
    
    // Custom tasks
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('build', [
        'clean:dist', 'bower', 'copy', 'rename', 'replace', 'processhtml',
        'uglify', 'cssmin', 'htmlmin'
    ]);
    grunt.registerTask('test', ['clean:test', 'karma', 'coveralls']);
    grunt.registerTask('docs', ['ngdocs']);
    
    // Default task.
    grunt.registerTask('default', ['lint', 'build', 'test', 'docs']);

};
