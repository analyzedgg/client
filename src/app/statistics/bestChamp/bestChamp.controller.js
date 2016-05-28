'use strict';

angular.module('leagueApp.statistics.bestChamp', ['highcharts-ng'])
    .controller('BestChampCtrl', bestChampController);

bestChampController.$inject = ['$scope', '$log', 'ChampionInfoService'];

function bestChampController($scope, log, championInfoService) {
    var mostWins = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails,
        summoner = $scope.statistics.selectedSummoner;

    var baseChartConfig = {
        options: {
            chart: {
                type: "pie"
            }
        },
        title: {
            text: null
        },
        subtitle: {
            text: ''
        },
        series: [{
            name: 'Total games',
            data: [],
            size: '90%',
            id: "Champion",
            dataLabels: {
                color: '#ffffff',
                distance: -40
            }
        }, {
            name: 'Ratio',
            data: [],
            size: '100%',
            innerSize: '90%',
            id: "WinsLossesPerChampion",
            dataLabels: {
                formatter: function () {
                    return null;
                }
            }
        }],
        loading: false,
        size: {
            width: 300,
            height: 300
        }
    };

    function createChartConfig(matchSeries) {
        var chartConfig = angular.copy(baseChartConfig);

        var winsAndLossesPerChampion = {};

        angular.forEach(matchSeries, function (match) {
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

        chartConfig.series[0].data = champData;
        chartConfig.series[1].data = winsLossesData;

        chartConfig.subtitle.text = 'Last ' + matchSeries.length + ' games';

        return chartConfig;
    }

    mostWins.firstChartConfig = createChartConfig(matchDetails);
    mostWins.secondChartConfig = createChartConfig(matchDetails.slice(30, 61));
    mostWins.thirdChartConfig = createChartConfig(matchDetails.slice(50, 61));
}