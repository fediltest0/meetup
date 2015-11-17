(function() {
    'use strict';

    function LoginController($log, $location, $firebaseAuth, refService) {
        var auth = $firebaseAuth(refService.getRef('root'));

        this.withGoogle = function() {
            auth.$authWithOAuthPopup("google").then(function(authData) {
                $log.debug('Authentication succeed: ', authData);
                $location.path('/materials');
            }).catch(function(error) {
                $log.error("Authentication failed: ", error);
            });
        };

        this.withGithub = function() {
            auth.$authWithOAuthPopup("github").then(function(authData) {
                $log.debug('Authentication succeed: ', authData);
                $location.path('/materials');
            }).catch(function(error) {
                $log.error("Authentication failed: ", error);
            });
        };
    }

    angular.module('app').controller('LoginController', [
        '$log',
        '$location',
        '$firebaseAuth',
        'refService',
        LoginController
    ]);
}());
