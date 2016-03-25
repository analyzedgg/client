'use strict';

angular.module('leagueApp.summoner', ['ui.bootstrap', 'isteven-multi-select'])
    .controller('SummonerPageCtrl', summonerController);

summonerController.$inject = ['$location'];

function summonerController($location) {
    var summoner = this; // jshint ignore:line

    summoner.regions = {
        'euw': 'EUW',
        'na': 'NA',
        'kr': 'KR',
        'br': 'BR',
        'eune': 'EUNE',
        'las': 'LAS',
        'lan': 'LAN',
        'oce': 'OCE',
        'rus': 'RUS',
        'tr': 'TR'
    };

    // Default values
    summoner.usernameInput = '';
    summoner.region = 'euw';

    summoner.submitForm = function() {
        var region = summoner.region,
            username = summoner.usernameInput;

        if (region && region !== '' && summoner.regions[region] && username && username !== '') {
            $location.path('/' + region + '/' + username + '/');
        }
    };
}