describe('MembersController', function() {

    var panel,
        meetupService;

    beforeEach(function() {
        module('app', function($provide) {
            panel = {
                toggle: function() {}
            };
            $provide.factory('$mdSidenav', function() {
                return function() {
                    return panel;
                };
            });
            
            meetupService = {
                getMembers: function() {},
                getMember: function() {
                    return {
                        member: {
                            notes: ''
                        }
                    };
                },
                updateMember: function() {}
            };
            $provide.factory('meetupService', function() {
                return meetupService;
            });
        });
    });

    it('should be defined', inject(function($controller, $rootScope) {
        expect(function() {
            $controller('MembersController', {$scope: $rootScope.$new()});
        }).not.toThrow();
    }));

    it('should toggle side navigation panel', inject(
        function($controller, $rootScope) {
            var ctrl = $controller('MembersController', {
                    $scope: $rootScope.$new()
                });
            expect(typeof ctrl.toggleSidenav).toBe('function');
            spyOn(panel, 'toggle');
            ctrl.toggleSidenav();
            expect(panel.toggle).toHaveBeenCalled();
        }
    ));

    it('should update the note', inject(
        function($controller, $rootScope) {
            var scope = $rootScope.$new(),
                ctrl = $controller('MembersController as ctrl', {
                    $scope: scope
                });
            spyOn(meetupService, 'updateMember');
            scope.$apply(function() {
                scope.ctrl.detail.member.notes = 'test';
            });
            expect(meetupService.updateMember).toHaveBeenCalled();
        }
    ));

    it('should fetch member on route parameters change', inject(
        function($controller, $rootScope, $location, $routeParams) {
            var scope = $rootScope.$new(),
                ctrl = $controller('MembersController as ctrl', {
                    $scope: scope
                });
            spyOn(meetupService, 'getMember').and.callThrough();
            $routeParams.id = 123;
            scope.$emit('$routeUpdate', []);
            scope.$apply();
            expect(meetupService.getMember).toHaveBeenCalledWith(123);
        }
    ));
});
