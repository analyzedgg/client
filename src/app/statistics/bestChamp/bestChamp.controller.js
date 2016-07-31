'use strict';

angular.module('leagueApp.statistics.bestChamp', ['highcharts-ng', 'leagueApp.service'])
    .controller('BestChampCtrl', bestChampController);

bestChampController.$inject = ['$scope', '$state', 'ChampionInfoService', 'BaseChartConfigService'];

function bestChampController($scope, $state, championInfoService, baseChartConfigService) {
    var bestChamp = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    bestChamp.chartConfig = baseChartConfigService.pieWithWinRate('Champions played', 'Total games');
    bestChamp.chartConfig.options.plotOptions = {
        series: {
            events: {
                click: onSeriesClick
            }
        }
    };

    function onSeriesClick(event) {
        var pointName = event.point.name,
            filter = {};

        if (pointName === 'Wins' || pointName === 'Losses') {
            filter = { 'win': pointName === 'Wins' };
        } else {
            filter = { 'champion': pointName };
        }

        $state.go('.', filter);
    }

    //////////
    init();

    function init() {
        var winsAndLossesPerChampion = {};

        angular.forEach(matchDetails, function (match) {
            var champName = championInfoService.championById(match.championId).key;

            if (!winsAndLossesPerChampion[champName]) {
                winsAndLossesPerChampion[champName] = {
                    wins: 0,
                    losses: 0
                };
            }

            if (match.winner) {
                winsAndLossesPerChampion[champName].wins++;
            } else {
                winsAndLossesPerChampion[champName].losses++;
            }
        });

        var champData = [],
            winsLossesData = [];

        angular.forEach(winsAndLossesPerChampion, function (winsAndLosses, champName) {
            champData.push({
                name: champName,
                y: winsAndLosses.wins + winsAndLosses.losses
            });

            winsLossesData.push({
                name: 'Wins',
                y: winsAndLosses.wins,
                color: '#0b0'
            });

            winsLossesData.push({
                name: 'Losses',
                y: winsAndLosses.losses,
                color: '#b00'
            });
        });

        bestChamp.chartConfig.series[0].data = champData;
        bestChamp.chartConfig.series[1].data = winsLossesData;
    }
}