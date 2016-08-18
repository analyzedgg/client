'use strict';

angular.module('analyzedggApp.statistics.bestChamp')
    .controller('BestChampCtrl', bestChampController);

bestChampController.$inject = ['$scope', '$state', 'BestChampService', 'BaseChartConfigService'];

function bestChampController($scope, $state, bestChampService, baseChartConfigService) {
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
        var seriesData = bestChampService.getSeriesData(matchDetails);

        bestChamp.chartConfig.series[0].data = seriesData[0];
        bestChamp.chartConfig.series[1].data = seriesData[1];
    }
}