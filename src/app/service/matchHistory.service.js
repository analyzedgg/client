'use strict';

angular.module('leagueApp.service')
    .service('MatchHistoryService', matchHistoryService);

matchHistoryService.$inject = ['$resource', '$log', 'ENV'];

function matchHistoryService($resource, log, ENV) {
    var matchInfo = $resource(ENV.BASE_URL + '/api/:region/matchhistory/:summonerId', {}, {
        'get': {
            method: 'GET',
            isArray: true
        }
    });

    return {
        matchHistory: matchHistory
    };

    function matchHistory(region, summonerId) {
    log.info(region, summonerId);
        return matchInfo.get({
            region: region,
            summonerId: summonerId}, success, handleError).$promise;
    }

    function success(response) {
        //
    }

    function handleError(response) {
        log.error('Call for match history info failed', response);
    }
}