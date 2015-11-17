(function() {
    'use strict';

    function MembersController(
        $scope, $routeParams, $mdSidenav, meetupService
    ) {
        this.members = meetupService.getMembers();
        this.detail = meetupService.getMember($routeParams.id);
        this.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.$watch('ctrl.detail.member.notes', function() {
            meetupService.updateMember(this.detail.member);
        }.bind(this));

        $scope.$on('$routeUpdate', function() {
            this.detail = meetupService.getMember($routeParams.id);
        }.bind(this));
    }

    angular.module('app').controller('MembersController', [
        '$scope',
        '$routeParams',
        '$mdSidenav',
        'meetupService',
        MembersController
    ]);
}());
