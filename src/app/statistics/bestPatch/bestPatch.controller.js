'use strict';

angular.module('leagueApp.statistics.bestPatch', [])
    .controller('BestPatchCtrl', bestPatchController);

bestPatchController.$inject = ['$scope'];

function bestPatchController($scope) {
    var bestPatch = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    bestPatch.chartConfig = {};

    var baseChartConfig = {
        options: {
            chart: {
                type: "column",
                backgroundColor: null
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            tooltip: {
                formatter: function() {
                    return "<b>" + this.series.name + "</b>: " + +this.y.toFixed(2);
                }
            }
        },
        title: {
            text: 'Best patch'
        },
        subtitle: {
            text: ''
        },
        series: [{
            name: 'Won games',
            data: [],
            stack: 'totalgames',
            color: '#0b0'
        }, {
            name: 'Lost games',
            data: [],
            stack: 'totalgames',
            color: '#b00'
        }, {
            name: 'KDA',
            data: [],
            yAxis: 1,
            stack: '1'
        }, {
            name: 'Average kills',
            data: [],
            yAxis: 1,
            stack: '2',
            visible: false
        }, {
            name: 'Average deaths',
            data: [],
            yAxis: 1,
            stack: '3',
            visible: false
        }, {
            name: 'Average assists',
            data: [],
            yAxis: 1,
            stack: '4',
            visible: false
        }],
        xAxis: {
            categories: []
        },
        yAxis: [{
            min: 0,
            title: {
                text: 'Games played'
            }
        }, {
            min: 0,
            title: {
                text: 'KDA'
            }
        }],
        loading: false
    };

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
        var chartConfig = angular.copy(baseChartConfig);

        var matchesByPatch = matchDetails.reduce(function(matchesByPatch, match) {
            var patch = match.matchVersion.split(".").slice(0, 2).join(".");

            matchesByPatch[patch] = matchesByPatch[patch] || [];
            matchesByPatch[patch].push(match);

            return matchesByPatch;
        }, {});

        var categories = getPatches(matchesByPatch);
        var seriesData = getSeriesData(matchesByPatch);

        chartConfig.xAxis.categories = categories;
        chartConfig.series[0].data = seriesData.wins;
        chartConfig.series[1].data = seriesData.losses;
        chartConfig.series[2].data = seriesData.kda;
        chartConfig.series[3].data = seriesData.avgKills;
        chartConfig.series[4].data = seriesData.avgDeaths;
        chartConfig.series[5].data = seriesData.avgAssists;

        bestPatch.chartConfig = chartConfig;
    }
}