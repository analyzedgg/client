'use strict';

angular.module('leagueApp.service.matchHistory', ['ngResource'])
    .service('MatchHistoryService', matchHistoryService);

matchHistoryService.$inject = ['$resource'];

function matchHistoryService($resource) {
    var matchInfo = $resource('api/:region/matchhistory/:summonerId', {}, {
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