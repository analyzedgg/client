'use strict';

angular.module('leagueApp.service.summonerInfo', ['ngResource'])
    .service('SummonerInfoService', summonerInfoService);

summonerInfoService.$inject = ['$resource'];

function summonerInfoService($resource) {
    var summonerInfo = $resource('api/:region/summoner/:summonerName', {}, {
        'get': {method: 'GET'}
    });

    return {
        summoner: summoner
    };

    function summoner(region, summonerName) {
        return summonerInfo.get({region: region, summonerName: summonerName}, success, handleError).$promise;
    }

    function success(response) {
        //
    }

    function handleError(response) {
        console.error('Call for summoner info failed', response);
    }
}