'use strict';

angular.module('leagueAPIApp.service.summonerInfo', ['ngResource'])

    .service('SummonerInfoService', ['$resource', function ($resource) {

        return $resource('https://euw.api.pvp.net/api/lol/:region/:version/summoner/by-name/:userNames', {}, {
            'get': {method: 'GET', params: {version: 'v1.4', 'api_key': '3c343a96-21ad-41bf-9d65-dd608a65d6ec'}}
        });
    }]);