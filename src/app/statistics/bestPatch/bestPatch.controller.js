'use strict';

angular.module('leagueApp.statistics.bestPatch', ['leagueApp.service'])
    .controller('BestPatchCtrl', bestPatchController);

bestPatchController.$inject = ['$scope', 'BaseChartConfigService'];

function bestPatchController($scope, baseChartConfigService) {
    var bestPatch = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    bestPatch.chartConfig = baseChartConfigService.columnWithWinRateAndKDA('Best patch');

    function getSeriesData(matchesByPatch) {
        var initialData = {
            wins: [], losses: [], kda: [], avgKills: [], avgDeaths: [], avgAssists: []
        };
        return Object.keys(matchesByPatch).reduce(function (seriesPerPatch, patch) {
            var initialSums = {
                wins: 0, kills: 0, deaths: 0, assists: 0
            };
            var stats = matchesByPatch[patch].reduce(function (acc, match) {
                acc.wins += (match.winner ? 1 : 0);
                acc.kills += match.stats.kills;
                acc.deaths += match.stats.deaths;
                acc.assists += match.stats.assists;

                return acc;
            }, initialSums);

            var totalMatches = matchesByPatch[patch].length;

            seriesPerPatch.wins.push(stats.wins);
            seriesPerPatch.losses.push(totalMatches - stats.wins);
            seriesPerPatch.kda.push((stats.kills + stats.assists) / stats.deaths);
            seriesPerPatch.avgKills.push(stats.kills / totalMatches);
            seriesPerPatch.avgDeaths.push(stats.deaths / totalMatches);
            seriesPerPatch.avgAssists.push(stats.assists / totalMatches);

            return seriesPerPatch;
        }, initialData);
    }

    function getPatches(matchesByPatch) {
        return Object.keys(matchesByPatch).map(function (patch) {
            return 'Patch ' + patch;
        });
    }

    /////////

    init();

    function init() {
        var matchesByPatch = matchDetails.reduce(function(matchesByPatch, match) {
            var patch = match.matchVersion.split(".").slice(0, 2).join(".");

            matchesByPatch[patch] = matchesByPatch[patch] || [];
            matchesByPatch[patch].push(match);

            return matchesByPatch;
        }, {});

        var categories = getPatches(matchesByPatch);
        var seriesData = getSeriesData(matchesByPatch);

        bestPatch.chartConfig.xAxis.categories = categories;
        bestPatch.chartConfig.series[0].data = seriesData.wins;
        bestPatch.chartConfig.series[1].data = seriesData.losses;
        bestPatch.chartConfig.series[2].data = seriesData.kda;
        bestPatch.chartConfig.series[3].data = seriesData.avgKills;
        bestPatch.chartConfig.series[4].data = seriesData.avgDeaths;
        bestPatch.chartConfig.series[5].data = seriesData.avgAssists;
    }
}