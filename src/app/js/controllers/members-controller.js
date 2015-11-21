(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @kind function
     * @name app.controller:MembersController
     * @requires $scope
     * @requires $routeParams
     * @requires $mdSidenav
     * @requires meetupService
     * @description
     * The `MembersController` is a controller that is used to expose
     * functionality required for members page. It provides methods to manage
     * UI as well as watching for changes in member details and persisting
     * changes using {@link app.meetupService meetupService}. Also
     * `MembersController` is responsible for updating selected user details
     * according to active route parameters.
     */
    function MembersController(
        $scope, $routeParams, $mdSidenav, meetupService
    ) {
        this.members = meetupService.getMembers();
        this.detail = meetupService.getMember($routeParams.id);

        /**
         * @ngdoc function
         * @kind function
         * @name app.controller:toggleSidenav#toggleSidenav
         * @methodOf app.controller:MembersController
         * @param {String} menuId ID of a sidebar to be toggled
         * @description
         * Toggles navigation sidebar using `$mdSidenav` service.
         *
         * ```html
         * <md-sidenav md-component-id="menu">Sidebar</md-sidenav>
         *
         * <div ng-controller="MembersController as vm">
         *   <button ng-click="vm.toggleSidenav('menu')">Toggle sidebar</button>
         * </div>
         * ```
         */
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
