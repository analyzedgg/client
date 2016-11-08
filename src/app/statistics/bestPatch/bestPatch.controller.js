'use strict';

angular.module('leagueApp.statistics.bestPatch')
    .controller('BestPatchCtrl', bestPatchController);

bestPatchController.$inject = ['$scope', '$state', 'BestPatchService', 'BaseChartConfigService'];

function bestPatchController($scope, $state, bestPatchService, baseChartConfigService) {
    var bestPatch = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    bestPatch.chartConfig = baseChartConfigService.columnWithWinRateAndKDA('Best patch');
    bestPatch.chartConfig.xAxis = {
        labels: {
            events: {
                click: function(event) {
                    var clickedText = event.target.textContent;

                    var labelPrefix = "Patch ";
                    if (clickedText.substring(0, labelPrefix.length) === labelPrefix) {
                        var filter = { 'patch': clickedText.slice(labelPrefix.length) };
                        $state.go('.', filter);
                    }
                }
            }
        }
    };

    /////////

    init();

    function init() {
        var seriesData = bestPatchService.getSeriesData(matchDetails);

        bestPatch.chartConfig.xAxis.categories = seriesData.categories;
        bestPatch.chartConfig.series[0].data = seriesData.seriesData.wins;
        bestPatch.chartConfig.series[1].data = seriesData.seriesData.losses;
        bestPatch.chartConfig.series[2].data = seriesData.seriesData.kda;
        bestPatch.chartConfig.series[3].data = seriesData.seriesData.avgKills;
        bestPatch.chartConfig.series[4].data = seriesData.seriesData.avgDeaths;
        bestPatch.chartConfig.series[5].data = seriesData.seriesData.avgAssists;
    }
}