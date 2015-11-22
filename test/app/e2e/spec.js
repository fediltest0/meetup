describe('Protractor Demo App', function() {
    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();
    });
    
    it('should have a title', function() {
        browser.get('http://localhost:8282/app/index.html');
        expect(browser.getTitle()).toEqual('Front-End.IL');
    });

    it('should open login page by default', function() {
        var url;
        browser.get('http://localhost:8282/app/index.html');
        ptor.waitForAngular();
        url = ptor.getCurrentUrl();
        expect(url.indexOf('#/login') > 0).toBeTruthy();
    });

});