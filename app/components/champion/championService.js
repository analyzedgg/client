'use strict';

angular.module('leagueAPIApp.service.champion', ['ngResource'])

    .service('ChampionService', ['$resource', function ($resource) {
        var version = 'v1.2';

        return {
            list: $resource('https://euw.api.pvp.net/api/lol/:region/:version/champion', {}, {
                'get': {
                    method: 'GET',
                    params: {version: version, 'api_key': '3c343a96-21ad-41bf-9d65-dd608a65d6ec'}
                }
            }),
            details: $resource('https://euw.api.pvp.net/api/lol/:region/:version/champion/:championId', {}, {
                'get': {method: 'GET', params: {version: version, 'api_key': '3c343a96-21ad-41bf-9d65-dd608a65d6ec'}}
            }),
            getTopThreeChampions: function (region, championIds) {
                console.log('Gonna retrieve the top three champions with', region, championIds);
                var champions = [];
                angular.forEach(championIds, function (championId, key) {
                    this.details.get({region: region, championId: championId},
                        function (response) {
                            champions.push(response);
                        }, function (errorResponse) {
                            console.log('Failed while retrieving champion detail info.', errorResponse);
                        })
                });
                return champions;
            }
        }
    }]);