'use strict';

angular.module('analyzedggApp.service')
    .service('MatchHistoryService', matchHistoryService);

matchHistoryService.$inject = ['$resource', '$log', 'ENV', 'MatchesFilterService'];

function matchHistoryService($resource, log, ENV, MatchesFilterService) {
    var matchInfo = $resource(ENV.BASE_URL + '/api/:region/matchhistory/:summonerId', {}, {
        'get': {
            method: 'GET',
            cache: true,
            isArray: true
        }
    });

    return {
        matchHistory: matchHistory
    };

    function matchHistory(region, summonerId) {
        return matchInfo.get({
            region: region,
            summonerId: summonerId
        })
        .$promise.then(function(rawMatches) {
            return {
                raw: rawMatches,
                filtered: MatchesFilterService.filter(rawMatches)
            };
        });
    }
}