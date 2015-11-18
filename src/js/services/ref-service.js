(function() {
    'use strict';

    function RefService($window, url) {

        var refCache = {
            'root': new $window.Firebase(url),
            'results': new $window.Firebase(url + '/results')
        };

        this.getRef = function getRef(collection) {
            if (!refCache[collection]) {
                refCache[collection] = new $window.Firebase(
                    url + '/' + collection
                );
            }
            return refCache[collection];
        };
    }

    angular.
        module('app').
        service('refService', [
            '$window',
            'baseFirebaseUrl',
            RefService
        ]);

}());
