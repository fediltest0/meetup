module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    return {
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
    };
};
