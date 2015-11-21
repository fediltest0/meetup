(function() {
    'use strict';

    /**
     * @ngdoc service
     * @kind function
     * @name app.refService
     * @requires $window
     * @requires baseFirebaseUrl
     * @description
     *
     * The `refService` is used to initialise and cache `Firebase` reference
     * objects.
     *
     * This is a low-level data access service that in most cases should not be
     * used directly in controllers or directives. `refService` should be used
     * by high-level services (like {@link app.meetupService}) that provide
     * abstraction on data source and add application specific semantics.
     *
     * For more information about `Firebase` reference objects see {@link
     * https://www.firebase.com/docs/web/api/firebase/constructor.html
     * Firebase API reference}
     *
     */
    function RefService($window, url) {

        var refCache = {
            'root': new $window.Firebase(url),
            'results': new $window.Firebase(url + '/results')
        };

        /**
         * @ngdoc function
         * @kind function
         * @name app.refService#getRef
         * @methodOf app.refService
         * @param {String} collection name of `Firebase` collection
         * @returns {Firebase} a `Firebase` reference for the specified
         * collection.
         *
         * @description
         * Returns cached reference object. In case reference object is
         * requested for the first time, it will be created and put into cache.
         *
         * ```js
         * refService.getRef('root');
         * ```
         */
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
