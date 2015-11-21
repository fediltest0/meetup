(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @kind function
     * @name app.controller:LoginController
     * @requires $log
     * @requires $location
     * @requires $firebaeAuth
     * @requires refService
     * @description
     * The `LoginContoller` is a controller that is used to expose
     * functionality required for login page. It provides multiple login
     * methods that are utilised by login view.
     */
    function LoginController($log, $location, $firebaseAuth, refService) {
        var auth = $firebaseAuth(refService.getRef('root'));

        /**
         * @ngdoc function
         * @kind function
         * @name app.controller:LoginController#withGoogle
         * @methodOf app.controller:LoginController
         *
         * @description
         * Authorises user using Google as OAuth provider. If user is not
         * authenticated, Google will ask to povide Google account credentials
         * first.
         *
         * ```html
         * <div ng-controller="LoginController as vm">
         *   <button ng-click="vm.withGoogle()">Log-in with Google</button>
         * </div>
         * ```
         */
        this.withGoogle = function() {
            auth.$authWithOAuthPopup("google").then(function(authData) {
                $log.debug('Authentication succeed: ', authData);
                $location.path('/members');
            }).catch(function(error) {
                $log.error("Authentication failed: ", error);
            });
        };

        /**
         * @ngdoc function
         * @kind function
         * @name app.controller:LoginController#withGithub
         * @methodOf app.controller:LoginController
         *
         * @description
         * Authorises user using GitHub as OAuth provider. If user is not
         * authenticated, GitHub will ask to povide GitHub account credentials
         * first.
         *
         * ```html
         * <div ng-controller="LoginController as vm">
         *   <button ng-click="vm.withGithub()">Log-in with GitHub</button>
         * </div>
         * ```
         */
        this.withGithub = function() {
            auth.$authWithOAuthPopup("github").then(function(authData) {
                $log.debug('Authentication succeed: ', authData);
                $location.path('/members');
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
