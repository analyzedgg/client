'use strict';

angular.module('leagueApp.statistics.bestTeam')
    .controller('BestTeamCtrl', bestTeamController);

bestTeamController.$inject = ['$scope', 'BestTeamService', 'BaseChartConfigService'];

function bestTeamController($scope, bestTeamService, baseChartConfigService) {
    var bestTeam = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    bestTeam.chartConfig = baseChartConfigService.columnWithWinRateAndKDA('Best team');

    /////////

    init();

    function init() {
        var seriesData = bestTeamService.getSeriesData(matchDetails);

        bestTeam.chartConfig.xAxis.categories = seriesData.categories;
        bestTeam.chartConfig.series[0].data = seriesData.seriesData.wins;
        bestTeam.chartConfig.series[1].data = seriesData.seriesData.losses;
        bestTeam.chartConfig.series[2].data = seriesData.seriesData.kda;
        bestTeam.chartConfig.series[3].data = seriesData.seriesData.avgKills;
        bestTeam.chartConfig.series[4].data = seriesData.seriesData.avgDeaths;
        bestTeam.chartConfig.series[5].data = seriesData.seriesData.avgAssists;
    }
}