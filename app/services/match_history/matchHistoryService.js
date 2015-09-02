'use strict';

angular.module('leagueApp.service.matchHistory', ['ngResource'])
    .service('MatchHistoryService', matchHistoryService);

matchHistoryService.$inject = ['$resource', 'ENV'];

function matchHistoryService($resource, ENV) {
    var matchInfo = $resource(ENV.BASE_URL + '/api/:region/matchhistory/:summonerId?queue=:queueType&champions=:champions', {}, {
        'get': {method: 'GET'}
    });

    return {
        matchHistory: matchHistory
    };

    function matchHistory(region, summonerId, queueType, champions) {
        return matchInfo.get({
            region: region,
            summonerId: summonerId,
            queueType: queueType,
            champions: champions.join(",")}, success, handleError).$promise;
    }

    function success(response) {
        //
    }

    function handleError(response) {
        console.log('Call for match history info failed', response);
    }
}