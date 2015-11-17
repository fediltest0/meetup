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
            }
        },
        jscs: {
            src: "**.js",
            options: {
                config: ".jscsrc",
                verbose: true
            }
        }
    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    
    // Custom tasks
    grunt.registerTask('test', ['jshint', 'jscs']);
    
    // Default task.
    grunt.registerTask('default', ['test']);

};
