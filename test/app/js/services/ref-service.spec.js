describe('RefService', function() {

    function Firebase() {}

    beforeEach(function() {
        module('app', function($provide) {
            $provide.constant('baseFirebaseUrl', 'http://test.com/');
            $provide.service('$window', function() {
                this.Firebase = Firebase;
            });
        });
    });
    
    it('should have getRef method', inject(
        function(refService) {
            expect(typeof refService.getRef).toBe('function');
        }
    ));
    
    it('should use cache for predefined paths', inject(
        function($window, refService) {
            spyOn($window, 'Firebase');
            refService.getRef('root');
            expect($window.Firebase).not.toHaveBeenCalled();
        }
    ));
    
    it('should create new ref for new path', inject(
        function($window, refService, baseFirebaseUrl) {
            spyOn($window, 'Firebase');
            refService.getRef('test');
            expect($window.Firebase).toHaveBeenCalledWith(
                baseFirebaseUrl + '/test'
            );
        }
    ));
});
