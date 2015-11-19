describe('MeetupService', function() {

    var child;

    beforeEach(function() {
        module('app', function($provide) {
            child = {
                set: function() {}
            };
            $provide.factory('refService', function() {
                return {
                    getRef: function() {
                        return {
                            child: function() {
                                return child
                            }
                        }
                    }
                }
            });
            $provide.factory('$firebaseArray', function() {
                return function() {
                    return {
                        '0': {
                            id: 0,
                            city: 'city0',
                            photo: {thumb_link: 'img.jpg'}
                        },
                        '1': {id: 1, city: 'city0', bio: 'bio'},
                        '2': {id: 2, city: 'city1'},
                        length: 3,
                        $loaded: function() {
                            return {
                                then: function(callback) {
                                    callback();
                                }
                            }
                        },
                        filter: function() {
                            return Array.prototype.filter.apply(
                                this, arguments
                            );
                        }
                    }
                }
            });
        });
    });
    
    it('should have getMembers method', inject(
        function(meetupService) {
            expect(typeof meetupService.getMembers).toBe('function');
        }
    ));
    
    it('should return map of cities to members', inject(
        function(meetupService) {
            var obj = meetupService.getMembers();
            expect(Object.keys(obj)).toEqual(['city0', 'city1']);
            expect(angular.isArray(obj.city0)).toBeTruthy();
            expect(angular.isArray(obj.city1)).toBeTruthy();
        }
    ));
    
    it('should have getMember method', inject(
        function(meetupService) {
            expect(typeof meetupService.getMember).toBe('function');
        }
    ));
    
    it('should return member by id', inject(
        function(meetupService) {
            var member = meetupService.getMember('1');
            expect(member).toEqual({member:{id: 1, city: 'city0', bio: 'bio'}});
        }
    ));
    
    it('should have updateMember method', inject(
        function(meetupService) {
            expect(typeof meetupService.updateMember).toBe('function');
        }
    ));
    
    it('should have updateMember method', inject(
        function(meetupService) {
            var obj = {$id: 1};
            spyOn(child, 'set').and.callThrough();
            meetupService.updateMember(obj);
            expect(child.set).toHaveBeenCalledWith({});
        }
    ));
});
