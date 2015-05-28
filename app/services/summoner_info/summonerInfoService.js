'use strict';

angular.module('leagueApp.service.summonerInfo', ['ngResource'])
    .service('SummonerInfoService', summonerInfoService);

summonerInfoService.$inject = ['$resource'];

function summonerInfoService($resource) {
    var summonerInfo = $resource('https://euw.api.pvp.net/api/lol/:region/:version/summoner/by-name/:summonerName', {}, {
        'get': {method: 'GET', params: {version: 'v1.4', 'api_key': '3c343a96-21ad-41bf-9d65-dd608a65d6ec'}}
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
        console.log('Call for summoner info failed', response);
    }
}