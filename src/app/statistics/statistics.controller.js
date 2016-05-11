'use strict';

angular.module('leagueApp.statistics')
    .controller('StatisticsCtrl', statisticsController);

statisticsController.$inject = ['$stateParams', 'SummonerInfoService', 'MatchHistoryService'];

function statisticsController($stateParams, summonerInfoService, matchHistoryService) {
    var statistics = this;

    var region = $stateParams.region,
        summonerName = $stateParams.summonerName;

    statistics.matchDetails = [];
    statistics.selectedSummoner = {};
    statistics.loading = false;

    statistics.summonerSelection = {
        region: $stateParams.region,
        summonerName: $stateParams.summonerName
    };

    statistics.template = {
        maingraph: 'app/statistics/maingraph/maingraph.html',
        mostWins: 'app/statistics/bestChamp/bestChamp.html',
        bestLane: 'app/statistics/bestLane/bestLane.html'
    };

    function init() {
        statistics.loading = true;

        summonerInfoService.summoner(region, summonerName).then(function(summoner) {
            statistics.selectedSummoner = summoner;

            matchHistoryService.matchHistory(region, summoner.id).then(function(matchHistory) {
                statistics.matchDetails = matchHistory;

                statistics.loading = false;
            });
        });
    }

    init();
}