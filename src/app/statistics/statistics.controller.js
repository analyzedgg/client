'use strict';

angular.module('leagueApp.statistics')
    .controller('StatisticsCtrl', statisticsController);

statisticsController.$inject = ['$scope', '$stateParams', 'summoner', 'matchDetails'];

function statisticsController(log, $stateParams, summoner, matchDetails) {
    var statistics = this; // jshint ignore:line

    statistics.matchDetails = matchDetails;
    statistics.summonerSelection = {
        region: $stateParams.region,
        summonerName: $stateParams.summonerName
    };
    statistics.selectedSummoner = summoner;

    statistics.template = {
        maingraph: 'app/statistics/maingraph/maingraph.html'
    };
}