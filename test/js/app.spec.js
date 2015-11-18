describe('App Module', function() {

    beforeEach(function() {
        // module(...) don't throw error
        // if module does not exist
        module('app');
    });

    it('should define module', function() {
        function fn() {
            // once module is not defined,
            // inject will throw error
            inject(function() {});
        }
        expect(fn).not.toThrow();
    });

});
