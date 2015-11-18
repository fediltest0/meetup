describe('LoginController', function() {
    
    var auth,
        isAuthSuccessful,
        data;
    
    beforeEach(function () {
        module('app', function($provide) {
            isAuthSuccessful = true;
            data = {};
            auth = {
                $authWithOAuthPopup: function() {
                    var obj = {
                        then: function(callback) {
                            if(isAuthSuccessful) {
                                callback(data);
                            }
                            return obj;
                        },
                        catch: function(callback) {
                            if(!isAuthSuccessful) {
                                callback(data);
                            }
                            return obj;
                        }
                    };
                    return obj;
                }
            };
            // $firebaseAuth
            $provide.factory('$firebaseAuth', function() {
                return function() {
                    return auth;
                }
            });
            // refService
            $provide.factory('refService', function() {
                return {
                    getRef: function() {}
                }
            });
        });
    });
    
    it('should be defined', inject(function($controller, $rootScope) {
        expect(function() {
            $controller('LoginController', {$scope: $rootScope.$new()});
        }).not.toThrow();
    }));
    
    it('should support Google authorisation', inject(
        function($controller, $rootScope) {
            var ctrl = $controller('LoginController', {
                $scope: $rootScope.$new()
            });
            expect(typeof ctrl.withGoogle).toBe('function');
        }
    ));
    
    it('should use Google authorisation and change location', inject(
        function($controller, $rootScope, $location) {
            var ctrl = $controller('LoginController', {
                $scope: $rootScope.$new()
            });
            spyOn(auth, '$authWithOAuthPopup').and.callThrough();
            $location.path('/');
            isAuthSuccessful = true;
            ctrl.withGoogle();
            expect(auth.$authWithOAuthPopup).toHaveBeenCalledWith('google');
            expect($location.path()).toBe('/members');
        }
    ));
    
    it('should fail to use Google authorisation log error', inject(
        function($controller, $rootScope, $location, $log) {
            var ctrl = $controller('LoginController', {
                $scope: $rootScope.$new()
            });
            spyOn(auth, '$authWithOAuthPopup').and.callThrough();
            $location.path('/');
            $log.reset();
            isAuthSuccessful = false;
            ctrl.withGoogle();
            expect($location.path()).toBe('/');
            expect($log.error.logs.length).toBeGreaterThan(0);
        }
    ));
    
    it('should support GitHub authorisation', inject(
        function($controller, $rootScope) {
            var ctrl = $controller('LoginController', {
                $scope: $rootScope.$new()
            });
            expect(typeof ctrl.withGithub).toBe('function');
        }
    ));
    
    it('should use GitHub authorisation and change location', inject(
        function($controller, $rootScope, $location) {
            var ctrl = $controller('LoginController', {
                $scope: $rootScope.$new()
            });
            spyOn(auth, '$authWithOAuthPopup').and.callThrough();
            $location.path('/');
            isAuthSuccessful = true;
            ctrl.withGithub();
            expect(auth.$authWithOAuthPopup).toHaveBeenCalledWith('github');
            expect($location.path()).toBe('/members');
        }
    ));
    
    it('should fail to use GitHub authorisation log error', inject(
        function($controller, $rootScope, $location, $log) {
            var ctrl = $controller('LoginController', {
                $scope: $rootScope.$new()
            });
            spyOn(auth, '$authWithOAuthPopup').and.callThrough();
            $location.path('/');
            $log.reset();
            isAuthSuccessful = false;
            ctrl.withGithub();
            expect($location.path()).toBe('/');
            expect($log.error.logs.length).toBeGreaterThan(0);
        }
    ));

});
