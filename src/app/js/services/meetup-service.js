(function() {
    'use strict';

    /**
     * @ngdoc service
     * @kind function
     * @name app.meetupService
     * @requires $firebaseArray
     * @requires refService
     * @requires noPhotoUrl
     * @description
     *
     * The `meetupService` provides abstraction on data source and allows
     * to perform basic operations on `members`. It also substitutes default
     * picture using `noPhotoUrl` constant and bio for members that don't have
     * this information.
     *
     * Internally `meetupService` heavily relies on {@link app.refService} that
     * provides low-level data access API.
     *
     */
    function MeetupService($firebaseArray, refService, noPhotoUrl) {

        var results,
            members;

        members = {};
        results = $firebaseArray(refService.getRef('results'));

        // Build members index by city
        results.$loaded().then(function() {
            angular.forEach(results, function(item) {
                item = angular.extend({}, item, true);
                if (!members[item.city]) {
                    members[item.city] = [];
                }
                if (!item.photo) {
                    item.photo = {};
                }
                if (!item.photo.thumb_link) {
                    item.photo.thumb_link = noPhotoUrl;
                }
                if (!item.bio) {
                    item.bio = 'No Bio';
                }
                members[item.city].push(item);
            });
        });

        /**
         * @ngdoc function
         * @kind function
         * @name app.meetupService#getMembers
         * @methodOf app.meetupService
         *
         * @description
         * Returns an object containing list of members. First time method is
         * called, the list of members will be empty and will be populated
         * asynchronously once data received from {@link app.refService
         * refService}.
         *
         * ```js
         * meetupService.getMembers();
         * ```
         */
        this.getMembers = function() {
            return members;
        };

        /**
         * @ngdoc function
         * @kind function
         * @name app.meetupService#getMember
         * @methodOf app.meetupService
         * @param {String|Number} member ID. String value will be parsed
         * as integer before use.
         *
         * @description
         * Returns member object by it's ID
         *
         * ```js
         * meetupService.getMember('1');
         * ```
         */
        this.getMember = function(id) {
            var member = {
                member: null
            };
            if (typeof id === 'string') {
                id = parseInt(id, 10);
            }
            results.$loaded().then(function() {
                member.member = results.filter(function(item) {
                    return item.id === id;
                }).pop();
            });
            return member;
        };

        /**
         * @ngdoc function
         * @kind function
         * @name app.meetupService#updateMember
         * @methodOf app.meetupService
         * @param {Object} member object representing a meetup member
         *
         * @description
         * In is not necessary to pass all properties of a member, only those
         * that have been changed. Only the presance of `$id` property in the
         * object is mandatory, all the others are optional.
         *
         * Member object that is passed as parameter will be cloned and all
         * properties starting from one of the following characters will be
         * deleted: `.#$/[]`.
         *
         * ```js
         * meetupService.updateMember({
         *     $id: 1,
         *     name: 'John Doe',
         *     city: 'Tel Aviv',
         *     notes: 'Some useful notes'
         * });
         * ```
         */
        this.updateMember = function(member) {
            var data, key;
            if (member && member.$id) {
                // Clone object
                data = angular.extend({}, member, true);
                // Remove technical properties
                for (key in member) {
                    if (member.hasOwnProperty(key) &&
                        ['.', '#', '$', '/', '[', ']'].indexOf(key[0]) >= 0
                    ) {
                        delete data[key];
                    }
                }
                refService.getRef('results').child(member.$id).set(data);
            }
        };
    }

    angular.
        module('app').
        service('meetupService', [
            '$firebaseArray',
            'refService',
            'noPhotoUrl',
            MeetupService
        ]);

}());
