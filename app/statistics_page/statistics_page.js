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
    var matchData = {

    }
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
        }];//, {name: 'KDA per game'}, {name: 'KDA per CS'}];

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
        //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
        useHighStocks: false,
        //size (optional) if left out the chart will default to size of the div or something sensible.
        size: {
            width: 400,
            height: 300
        },
        //function (optional)
        func: function (chart) {
            //setup some logic for the chart
        }
    };

    function retrievePageData() {
        delete statistics.matchHistoryError;
        var activeRegion = stateService.getActiveRegion();
        var summonerId = stateService.getActiveSummoner().id;

        getMatchHistory(activeRegion, summonerId);
    }

    function getMatchHistory(region, summonerId) {
        console.log('Gonna perform the request for match history with the follow params:', summonerId, region);
        var promise = matchHistoryService.matchHistory(region, summonerId);
        promise.then(function (data) {
            fillChartWithMatchHistoryData(data.response);
        }).catch(function (errorResponse) {
            statistics.matchHistoryError = 'Could not retrieve match history for summoner with id ' + summonerId + ' on the ' + region + 'servers';
            console.error('Error loading summoner info', errorResponse);
        });
    }

    function fillChartWithMatchHistoryData(matchHistory) {
        console.log('In fill chart func with', matchHistory);
        var dataSerie = {
            name: stateService.getActiveSummoner().name
        };
        var data = [];
        angular.forEach(matchHistory, function (match, index) {
            var xValue = statistics.selectedPreset.xAxis(match, index);
            var yValue = statistics.selectedPreset.yAxis(match);
            data.push([xValue, yValue]);
        });
        console.log('Done putting all the data in an array', data);
        dataSerie.data = data;
        dataSerie.tooltip = statistics.selectedPreset.tooltip;
        dataSerie.type = statistics.selectedPreset.type;
        statistics.chartConfig.series.push(dataSerie);
        statistics.chartConfig.loading = false;
    }

    $scope.$on('summonerSet', function (event, args) {
        console.log('STATISTICS PAGE. A summoner is selected, lets load its data', event, args);
        retrievePageData();
    });
}