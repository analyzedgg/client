'use strict';

angular.module('leagueApp.service')
    .service('SummonerInfoService', summonerInfoService);

summonerInfoService.$inject = ['$resource', '$log', 'ENV'];

function summonerInfoService($resource, log, ENV) {
    var summonerInfo = $resource(ENV.BASE_URL + '/api/:region/summoner/:summonerName', {}, {
        'get': {method: 'GET'}
    });

    return {
        summoner: summoner
    };

    function summoner(region, summonerName) {
    log.info('Perform with', region, summonerName);
        return summonerInfo.get({
            region: region,
            summonerName: encodeURIComponent(summonerName)
            }, success, handleError).$promise;
    }

    function success(response) {
        //
    }

    function handleError(response) {
        log.error('Call for summoner info failed', response);
    }
}