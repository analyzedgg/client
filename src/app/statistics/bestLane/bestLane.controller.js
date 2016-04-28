'use strict';

angular.module('leagueApp.statistics.bestLane', ['highcharts-ng'])
    .controller('BestLaneCtrl', bestLaneController);

bestLaneController.$inject = ['$scope', 'ChampionInfoService'];

function bestLaneController($scope, championInfoService) {
    var bestLane = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

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
            id: "Lanes",
            dataLabels: {
                color: '#ffffff',
                distance: -40
            }
        }, {
            name: 'Ratio',
            data: [],
            size: '100%',
            innerSize: '90%',
            id: "WinsLossesPerLane",
            dataLabels: {
                formatter: function () {
                    return null;
                }
            }
        } ],
        loading: false,
        size: {
            width: 300,
            height: 300
        }
    };

    function createChartConfig(matchSeries) {
        var chartConfig = angular.copy(baseChartConfig);

        var winsAndLossesPerLane = {};

        angular.forEach(matchSeries, function(match) {
            var lane = match.lane;
            if (lane === 'BOTTOM') {
                lane = (match.role === 'DUO_CARRY') ? 'AD CARRY' : 'SUPPORT';
            }

            if (!winsAndLossesPerLane[lane]) {
                winsAndLossesPerLane[lane] = {
                    wins: 0,
                    losses: 0
                };
            }

            if (match.winner) {
                winsAndLossesPerLane[lane].wins++;
            } else {
                winsAndLossesPerLane[lane].losses++;
            }
        });

        var lanesData = [],
            winsLossesData = [];
        angular.forEach(winsAndLossesPerLane, function(winsAndLosses, lane) {
            lanesData.push({
                name: lane,
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

        chartConfig.series[0].data = lanesData;
        chartConfig.series[1].data = winsLossesData;

        chartConfig.subtitle.text = 'Last ' + matchSeries.length + ' games';

        return chartConfig;
    }

    bestLane.firstChartConfig =     createChartConfig(matchDetails);
    bestLane.secondChartConfig =    createChartConfig(matchDetails.slice(30, 61));
    bestLane.thirdChartConfig =     createChartConfig(matchDetails.slice(50, 61));
}