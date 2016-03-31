'use strict';

angular.module('leagueApp.statistics')
    .controller('StatisticsCtrl', statisticsController);

statisticsController.$inject = ['$stateParams', 'summoner', 'matchDetails'];

function statisticsController($stateParams, summoner, matchDetails) {
    var statistics = this; // jshint ignore:line

    statistics.matchDetails = matchDetails;
    statistics.summonerSelection = {
        region: $stateParams.region,
        summonerName: $stateParams.summonerName
    };
    statistics.selectedSummoner = summoner;

    statistics.template = {
        maingraph: 'app/statistics/maingraph/maingraph.html',
        mostWins: 'app/statistics/mostWins/mostWins.html'
    };
}