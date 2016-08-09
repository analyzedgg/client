'use strict';

angular.module('analyzedggApp.statistics.bestLane')
    .controller('BestLaneCtrl', bestLaneController);

bestLaneController.$inject = ['$scope', 'BestLaneService', 'BaseChartConfigService'];

function bestLaneController($scope, bestLaneService, baseChartConfigService) {
    var bestLane = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    bestLane.chartConfig = baseChartConfigService.pieWithWinRate('Lanes played', 'Total games');

    /////////

    init();

    function init() {
        var seriesData = bestLaneService.getSeriesData(matchDetails);

        bestLane.chartConfig.series[0].data = seriesData[0];
        bestLane.chartConfig.series[1].data = seriesData[1];
    }
}