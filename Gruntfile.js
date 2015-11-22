module.exports = function(grunt) {
    var tasks;

    // Load configuration.
    require('load-grunt-initconfig')(grunt);

    // Custom tasks
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('compile', [
        'clean:dist', 'bower', 'copy', 'rename', 'replace', 'processhtml',
        'uglify', 'cssmin', 'htmlmin'
    ]);
    grunt.registerTask('test:unit', ['clean:test', 'karma', 'coveralls']);
    grunt.registerTask('test:e2e', ['http-server', 'protractor']);
    grunt.registerTask('docs', ['ngdocs']);
    
    // Default task.
    tasks = [
        'clean:src',
        'lint',
        'compile',
        'test:unit',
        'docs'
    ];
    if (process.env.TRAVIS) {
        tasks.push('test:e2e');
    }
    grunt.registerTask('default', tasks);

};
