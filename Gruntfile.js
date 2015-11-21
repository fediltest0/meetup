module.exports = function(grunt) {

    // Load configuration.
    require('load-grunt-initconfig')(grunt);

    // Custom tasks
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('compile', [
        'clean:dist', 'bower', 'copy', 'rename', 'replace', 'processhtml',
        'uglify', 'cssmin', 'htmlmin'
    ]);
    grunt.registerTask('test:unit', ['clean:test', 'karma', 'coveralls']);
    grunt.registerTask('docs', ['ngdocs']);
    
    // Default task.
    grunt.registerTask('default', [
        'clean:src',
        'lint',
        'compile',
        'test:unit',
        'docs'
    ]);

};
