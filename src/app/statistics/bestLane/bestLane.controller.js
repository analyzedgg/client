'use strict';

angular.module('leagueApp.statistics.bestLane')
    .controller('BestLaneCtrl', bestLaneController);

bestLaneController.$inject = ['$scope', '$state', 'BestLaneService', 'BaseChartConfigService'];

function bestLaneController($scope, $state, bestLaneService, baseChartConfigService) {
    var bestLane = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    bestLane.chartConfig = baseChartConfigService.pieWithWinRate('Lanes played', 'Total games');
    bestLane.chartConfig.options.plotOptions = {
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
            filter = { 'lane': pointName };
        }

        $state.go('.', filter);
    }

    /////////

    init();

    function init() {
        var seriesData = bestLaneService.getSeriesData(matchDetails);

        bestLane.chartConfig.series[0].data = seriesData[0];
        bestLane.chartConfig.series[1].data = seriesData[1];
    }
}