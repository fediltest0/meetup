exports.config = {
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    multiCapabilities: [{
        'platform': 'LINUX',
        'browserName': 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'name': 'meetup [Chrome]',
        'build': process.env.TRAVIS_BUILD_NUMBER
    }, {
        'platform': 'Windows 7',
        'browserName': 'internet explorer',
        'version': '9.0',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'name': 'meetup [IE]',
        'build': process.env.TRAVIS_BUILD_NUMBER
    }],
    framework: 'jasmine',
    specs: ['test/spec.js']
};
