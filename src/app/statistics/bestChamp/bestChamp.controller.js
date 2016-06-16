'use strict';

angular.module('leagueApp.statistics.bestChamp', ['highcharts-ng'])
    .controller('BestChampCtrl', bestChampController);

bestChampController.$inject = ['$scope', '$state', 'ChampionInfoService'];

function bestChampController($scope, $state, championInfoService) {
    var bestChamp = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    bestChamp.chartConfig = {};

    var baseChartConfig = {
        options: {
            chart: {
                type: "pie"
            },
            plotOptions: {
                series: {
                    events: {
                        click: onSeriesClick
                    }
                }
            }
        },
        title: {
            text: 'Champions played'
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
        loading: false
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
        var chartConfig = angular.copy(baseChartConfig);

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

        chartConfig.series[0].data = champData;
        chartConfig.series[1].data = winsLossesData;

        bestChamp.chartConfig = chartConfig;
    }
}