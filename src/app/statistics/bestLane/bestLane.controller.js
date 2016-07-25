'use strict';

angular.module('leagueApp.statistics.bestLane', ['highcharts-ng'])
    .controller('BestLaneCtrl', bestLaneController);

bestLaneController.$inject = ['$scope'];

function bestLaneController($scope) {
    var bestLane = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    bestLane.chartConfig = {};

    var baseChartConfig = {
        options: {
            chart: {
                type: "pie",
                backgroundColor: null
            }
        },
        title: {
            text: 'Lanes played'
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
        }],
        loading: false
    };

    /////////

    init();

    function init() {
        var chartConfig = angular.copy(baseChartConfig);

        var winsAndLossesPerLane = {};

        angular.forEach(matchDetails, function (match) {
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
        angular.forEach(winsAndLossesPerLane, function (winsAndLosses, lane) {
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

        bestLane.chartConfig = chartConfig;
    }
}