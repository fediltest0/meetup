(function() {
    'use strict';

    function RefService(url) {

        var refCache = {
            'root': new Firebase(url),
            'results': new Firebase(url + '/results')
        };

        this.getRef = function getRef(collection) {
            if (!refCache[collection]) {
                refCache[collection] = new Firebase(url + '/' + collection);
            }
            return refCache[collection];
        };
    }

    angular.
        module('app').
        service('refService', [
            'baseFirebaseUrl',
            RefService
        ]);

}());
