module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-ngdocs');
    return {
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
            src: ['src/app/js/**/*.js', 'src/docs/api/**/*.ngdoc'],
            title: 'API Documentation'
        }
    };
};
