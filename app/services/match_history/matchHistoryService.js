'use strict';

angular.module('leagueApp.service.matchHistory', ['ngResource'])
    .service('MatchHistoryService', matchHistoryService);

matchHistoryService.$inject = ['$resource'];

function matchHistoryService($resource) {
    var summonerInfo = $resource('api/:region/matchhistory/:summonerId', {}, {
        'get': {method: 'GET', isArray: true}
    });

    return {
        matchHistory: matchHistory
    };

    function matchHistory(region, summonerId) {
        return summonerInfo.get({region: region, summonerId: summonerId}, success, handleError).$promise;
    }

    function success(response) {
        //
    }

    function handleError(response) {
        console.log('Call for match history info failed', response);
    }
}