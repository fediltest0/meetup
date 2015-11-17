(function() {
    'use strict';

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

        this.getMembers = function() {
            return members;
        };

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
