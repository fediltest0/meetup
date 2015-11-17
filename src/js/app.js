(function() {
    'use strict';

    function config($routeProvider, $mdThemingProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .when('/members', {
                templateUrl: 'partials/members.html',
                controller: 'MembersController',
                controllerAs: 'vm',
                reloadOnSearch: false
            })
            .otherwise('/login');

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');
    }

    angular
        .module('app', [
            'ngAnimate',
            'ngAria',
            'ngMaterial',
            'ngMdIcons',
            'ngRoute',
            'firebase'
        ])
        .constant(
            'baseFirebaseUrl',
            'https://shining-heat-601.firebaseio.com/'
        )
        .constant(
            'noPhotoUrl',
            'http://photos4.meetupstatic.com/img/noPhoto_50.png'
        )
        .config([
            '$routeProvider',
            '$mdThemingProvider',
            config
        ]);

}());
