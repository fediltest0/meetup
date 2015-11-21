module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-replace');
    return {
        dist: {
            options: {
                variables: {
                    version: '<%= pkg.version %>'
                },
                patterns: [{
                    match: /['"]lib\/([^\/]+)\/(.+)\.(js|css)['"]/g,
                    replacement: function(match, lib, file, ext) {
                        var bwr = grunt.file.readJSON(
                                grunt.config.process(
                                    '<%= bowerrc.directory %>'
                                ) +
                                lib + '/bower.json'
                            ),
                            path = '"lib/' + lib + '/' +
                               file.replace(/\.min|-debug/, '') +
                               '.min.' + ext +
                               '?_=' + bwr.version + '"';
                        return path;
                    }
                }]
            },
            files: [{
                src: ['dist/app/index.html'],
                dest: 'dist/app/index.html'
            }]
        }
    };
};
