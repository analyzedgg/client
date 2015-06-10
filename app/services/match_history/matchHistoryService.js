'use strict';

angular.module('leagueApp.service.matchHistory', ['ngResource'])
    .service('MatchHistoryService', matchHistoryService);

matchHistoryService.$inject = ['$resource', 'BASE_URL'];

function matchHistoryService($resource, BASE_URL) {
    var matchInfo = $resource(BASE_URL + '/api/:region/matchhistory/:summonerId', {}, {
        'get': {method: 'GET'}
    });

    return {
        matchHistory: matchHistory
    };

    function matchHistory(region, summonerId) {
        return matchInfo.get({region: region, summonerId: summonerId}, success, handleError).$promise;
    }

    function success(response) {
        //
    }

    function handleError(response) {
        console.log('Call for match history info failed', response);
    }
}