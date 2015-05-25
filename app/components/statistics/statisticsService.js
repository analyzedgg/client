'use strict';

angular.module('leagueAPIApp.service.statistics', ['ngResource'])

    .service('StatisticsService', ['$resource', function ($resource) {
        return {
            summary: $resource('https://euw.api.pvp.net/api/lol/:region/:version/stats/by-summoner/:summonerId/summary', {}, {
                'get': {method: 'GET', params: {version: 'v1.3', 'api_key': '3c343a96-21ad-41bf-9d65-dd608a65d6ec'}}
            }),
            league: $resource('https://euw.api.pvp.net/api/lol/:region/:version/league/by-summoner/:summonerId/entry', {}, {
                'get': {method: 'GET', params: {version: 'v2.5', 'api_key': '3c343a96-21ad-41bf-9d65-dd608a65d6ec'}}
            }),
            matchHistory: $resource('https://euw.api.pvp.net/api/lol/:region/:version/matchhistory/:summonerId', {}, {
                'get': {method: 'GET', params: {version: 'v2.2', 'api_key': '3c343a96-21ad-41bf-9d65-dd608a65d6ec'}}
            }),
            lastPlayedChampions: function (region, summonerId) {
                console.log('Gonna retrieve champion ids from the match history with:', region, summonerId);
                var playedChampions = [];
                this.matchHistory.get({summonerId: summonerId, region: region},
                    function (response) {
                        console.log('Retrieved champs', response);
                        angular.forEach(response.matches, function (match, key) {
                            playedChampions.push(match.participants[0].championId);
                        });
                        return playedChampions;
                    },
                    function (errorResponse) {
                        console.log('Failed to retrieve championids from the match history', errorResponse);
                    });
            }
        }
    }]);