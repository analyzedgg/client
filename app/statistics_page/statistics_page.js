'use strict';

angular.module('leagueApp.statistics_page', ['ngRoute', 'highcharts-ng'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/stats', {
            templateUrl: 'statistics_page/statistics_page.html',
            controller: 'StatisticsPageCtrl',
            controllerAs: 'statistics'
        });
    }])
    .controller('StatisticsPageCtrl', statisticsController);

statisticsController.$inject = ['$scope', 'MatchHistoryService', 'StateService'];

function statisticsController($scope, matchHistoryService, stateService) {
    var statistics = this;
    //The possible filtering options for the x axis
    statistics.currentSummoners = [];

    var xAxisPresets = {
        byGame: function (data, index) {
            return index + 1;
        },
        byMinute: function (data) {
            return Math.round(data.matchDuration / 60);
        },
        byGameDuration: function (data) {
            return data.matchDuration;
        }
    };
    //The possible filtering options for the y axis
    var yAxisPresets = {
        cs: function (data) {
            return data.stats.minionKills;
        },
        averageCs: function (data) {
            return Math.round(data.stats.minionKills / (data.matchDuration / 60) * 100) / 100;
        },
        kills: function (data) {
            return data.stats.kills;
        },
        deaths: function (data) {
            return data.stats.deaths;
        },
        assists: function (data) {
            return data.stats.assists;
        },
        kda: function (data) {
            return Math.round((data.stats.kills + data.stats.assists) / data.stats.deaths * 100) / 100;
        }
    };

    //The possible chart options
    //[{value: 'line'}, {value: 'spline'}, {value: 'area'}, {value: 'areaspline'}, {value: 'column'}, {value: 'bar'}, {value: 'pie'}, {value: 'scatter'});

    statistics.chartPresets = [
        {
            name: 'CS per game',
            type: 'spline',
            xAxis: xAxisPresets.byGame,
            yAxis: yAxisPresets.cs,
            tooltip: {
                pointFormat: 'Game {point.x}, {point.y} cs.'
            }
        },
        {
            name: 'Average cs per minute per game',
            type: 'scatter',
            xAxis: xAxisPresets.byMinute,
            yAxis: yAxisPresets.averageCs,
            tooltip: {
                pointFormat: '{point.x} minutes played, {point.y} average cs per minute.'
            }
        },
        {
            name: 'KDA per game',
            type: 'scatter',
            xAxis: xAxisPresets.byGame,
            yAxis: yAxisPresets.kda,
            tooltip: {
                pointFormat: 'Game {point.x}, {point.y} KDA.'
            }
        },
        {
            name: 'KDA per CS',
            type: 'spline',
            xAxis: yAxisPresets.cs,
            yAxis: yAxisPresets.kda,
            tooltip: {
                pointFormat: '{point.x} CS, {point.y} KDA'
            }
        }];

    statistics.selectedPreset = statistics.chartPresets[0];

    //This is not a highcharts object. It just looks a little like one!
    statistics.chartConfig = {

        options: {
            //This is the Main Highcharts chart config. Any Highchart options are valid here.
            //will be overriden by values specified below.
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>'
            }
        },
        //The below properties are watched separately for changes.

        //Series object (optional) - a list of series using normal highcharts series options.
        series: [],
        //Title configuration (optional)
        title: {
            text: 'CS Per minutes'
        },
        //Boolean to control showng loading status on chart (optional)
        //Could be a string if you want to show specific loading text.
        loading: true,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
        xAxis: {
            currentMin: 0,
            title: {text: 'Minutes'}
        },
        yAxis: {
            currentMin: 1,
            title: {text: 'CS'}
        },
        //size (optional) if left out the chart will default to size of the div or something sensible.
        size: {
            width: 800,
            height: 600
        }
    };

    function retrievePageData() {
        delete statistics.matchHistoryError;
        var activeRegion = stateService.getActiveRegion();
        var activeSummoner = stateService.getActiveSummoner();

        if (!summonerInCurrentList(activeSummoner.name)) {
            getMatchHistory(activeRegion, activeSummoner);
        }
    }

    function getMatchHistory(region, summoner) {
        console.log('Gonna perform the request for match history with the follow params:', summoner.id, region);
        var promise = matchHistoryService.matchHistory(region, summoner.id);
        promise.then(function (data) {
            statistics.currentSummoners.push({name: summoner.name, matchHistory: data.response});
            fillChartWithMatchHistoryData();
        }).catch(function (errorResponse) {
            statistics.matchHistoryError = 'Could not retrieve match history for summoner with id ' + summoner.id + ' on the ' + region + 'servers';
            console.error('Error loading summoner info', errorResponse);
        });
    }

    function fillChartWithMatchHistoryData() {
        console.log('In fill chart func with', statistics.currentSummoners);
        statistics.chartConfig.loading = true;
        var dataSeries = [];
        var axisMaxValues = {xAxis: 0, yAxis: 0};

        angular.forEach(statistics.currentSummoners, function (summoner) {
            var dataSerie = {
                name: summoner.name
            };
            var data = [];
            angular.forEach(summoner.matchHistory, function (match, index) {
                var xValue = statistics.selectedPreset.xAxis(match, index);
                var yValue = statistics.selectedPreset.yAxis(match);
                data.push([xValue, yValue]);

                if (xValue > axisMaxValues.xAxis) {
                    axisMaxValues.xAxis = xValue;
                }

                if (yValue > axisMaxValues.yAxis) {
                    axisMaxValues.yAxis = yValue;
                }
            });
            dataSerie.data = data;
            dataSerie.tooltip = statistics.selectedPreset.tooltip;
            dataSerie.type = statistics.selectedPreset.type;
            dataSeries.push(dataSerie);
        });
        setChartSeries(dataSeries);
        setChartAxisMaximums(axisMaxValues);
        statistics.chartConfig.loading = false;
    }

    //Check if the filled in summoner is already in the current summoners list
    function summonerInCurrentList(summonerName) {
        var match = false;
        angular.forEach(statistics.currentSummoners, function (summoner) {
            if (angular.equals(summoner.name, summonerName)) {
                match = true;
            }
        });
        return match;
    }

    function setChartSeries(series) {
        statistics.chartConfig.series = series;
    }

    function setChartAxisMaximums(axisValues) {
        statistics.chartConfig.xAxis.currentMax = axisValues.xAxis;
        statistics.chartConfig.yAxis.currentMax = axisValues.yAxis;
    }

    function resetChartConfig() {
        setChartSeries({});
    }

    $scope.$on('summonerSet', function () {
        retrievePageData();
    });

    $scope.$watch('statistics.selectedPreset', function (oldValue, newValue) {
        console.debug('Changed preset from', oldValue, 'to', newValue);
        resetChartConfig();
        fillChartWithMatchHistoryData();
    });
}