module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-gh-pages');
    return {
        dist: {
            options: {
                // repo: grunt.config.process('<%= pkg.repo.url %>').replace(
                //     /.*:\/\//,
                //     'https://' + process.env.GH_TOKEN + '@'
                // ),
                base: 'dist',
                message: 'Generate gh-pages with Grunt task gh-pages:dist',
                // user: {
                //     name: 'Travis CI',
                //     email: 'travis@localhost.localdomain'
                // },
                silent: true
            },
            src: ['**']
        }
    };
};
