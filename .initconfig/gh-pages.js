module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-gh-pages');
    return {
        dist: {
            options: {
                repo: 'https://' +
                    process.env.GH_TOKEN +
                    '@github.com/fediltest0/meetup.git',
                base: 'dist',
                message: 'Generate gh-pages with Grunt task gh-pages:dist',
                user: {
                    name: 'Travis CI',
                    email: 'travis@localhost.localdomain'
                },
                silent: true
            },
            src: ['**']
        }
    };
};
