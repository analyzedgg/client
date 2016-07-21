'use strict';

angular.module('leagueApp.summoner', ['isteven-multi-select'])
    .controller('SummonerPageCtrl', summonerController);

summonerController.$inject = ['$state', '$stateParams'];

function summonerController($state, $stateParams) {
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

    // Get values from the URL or else take the defaults
    summoner.usernameInput =                                    $stateParams.summonerName   || '';
    summoner.region = summoner.regions[$stateParams.region] ?   $stateParams.region         : 'euw';

    summoner.submitForm = function() {
        var region = summoner.region,
            username = summoner.usernameInput;

        if (region && region !== '' && summoner.regions[region] && username && username !== '') {
            $state.go('soloStatistics', {region: region, summonerName: username});
        }
    };
}