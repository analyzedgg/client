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
    //The current summoners which are shown in the chart.
    statistics.currentSummoners = [];
    //The possible filtering options for the x axis.
    var xAxisPresets = {
        byGame: {
            name: 'Games',
            value: function (data, index) {
                return index + 1;
            }
        },
        byMinute: {
            name: 'Minutes played',
            value: function (data) {
                return Math.round((data.matchDuration / 60) * 100) / 100;
            }
        }
    };
    //The possible filtering options for the y axis.
    var yAxisPresets = {
        cs: {
            name: 'CS',
            value: function (data) {
                return data.stats.minionKills;
            }
        },
        averageCs: {
            name: 'Average CS',
            value: function (data) {
                return Math.round(data.stats.minionKills / (data.matchDuration / 60) * 100) / 100;
            }
        },
        kills: {
            name: 'Kills',
            value: function (data) {
                return data.stats.kills;
            }
        },
        deaths: {
            name: 'Deaths',
            value: function (data) {
                return data.stats.deaths;
            }
        },
        assists: {
            name: 'Assists',
            value: function (data) {
                return data.stats.assists;
            }
        },
        kda: {
            name: 'KDA',
            value: function (data) {
                var killAssists = data.stats.kills + data.stats.assists;
                var deaths = data.stats.deaths || 1;
                return Math.round(((killAssists) / deaths) * 100) / 100;
            }
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
            type: 'spline',
            xAxis: xAxisPresets.byGame,
            yAxis: yAxisPresets.kda,
            tooltip: {
                pointFormat: 'Game {point.x}, {point.y} KDA.'
            }
        },
        {
            name: 'KDA per CS',
            type: 'scatter',
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
            currentMin: 0,
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

    /**
     * Retrieve the match data for a given region and summoner from the API.
     * @param region
     *      The selected region.
     * @param summoner
     *      The selected summoner.
     */
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

    /**
     * The main function for controlling, transforming and filling the chart.
     */
    function fillChartWithMatchHistoryData() {
        console.debug('In fill chart func with', statistics.currentSummoners);
        statistics.chartConfig.loading = true;
        var dataSeries = [];
        var axisValues = {xAxisMin: 100, xAxisMax: 0, yAxisMin: 100, yAxisMax: 0};

        angular.forEach(statistics.currentSummoners, function (summoner) {
            var dataSet = {
                name: summoner.name
            };
            var data = [];
            angular.forEach(summoner.matchHistory, function (match, index) {
                var xValue = statistics.selectedPreset.xAxis.value(match, index);
                var yValue = statistics.selectedPreset.yAxis.value(match);
                data.push([xValue, yValue]);
                axisValues = calculateAxisValues(axisValues, xValue, yValue);
            });
            dataSet.data = data;
            dataSet.tooltip = statistics.selectedPreset.tooltip;
            dataSet.type = statistics.selectedPreset.type;
            dataSeries.push(dataSet);
        });
        setChartSeries(dataSeries);
        setChartAxisValues(axisValues);
        setChartTitles();
        statistics.chartConfig.loading = false;
    }

    /**
     * Calculate the new axis minimums and maximums for the chart.
     * @param axisValues
     *      The list of current min an max values.
     * @param xValue
     *      The match specific xValue.
     * @param yValue
     *      The match specific yValue.
     * @returns
     *      The updated array axisValues.
     */
    function calculateAxisValues(axisValues, xValue, yValue) {
        if (xValue > axisValues.xAxisMax) {
            axisValues.xAxisMax = xValue;
        }

        if (xValue < axisValues.xAxisMin) {
            axisValues.xAxisMin = xValue;
        }

        if (yValue > axisValues.yAxisMax) {
            axisValues.yAxisMax = yValue;
        }

        if (yValue < axisValues.yAxisMin) {
            axisValues.yAxisMin = yValue;
        }

        return axisValues;
    }

    /**
     * Check if the filled in summoner is already in the current summoners list.
     * @param summonerName
     *      The active summoners name.
     * @returns {boolean}
     *      Indicator if the summoner is already in the current summoners list.
     */
    function summonerInCurrentList(summonerName) {
        var match = false;
        angular.forEach(statistics.currentSummoners, function (summoner) {
            if (angular.equals(summoner.name, summonerName)) {
                match = true;
            }
        });
        return match;
    }

    /**
     * Set the data series for the active chart.
     * @param series
     *      The series to use in the chart.
     */
    function setChartSeries(series) {
        statistics.chartConfig.series = series;
    }

    /**
     * Set the minimum and maximum values for the axis of the chart.
     * @param axisValues
     */
    function setChartAxisValues(axisValues) {
        statistics.chartConfig.xAxis.currentMin = axisValues.xAxisMin;
        statistics.chartConfig.xAxis.currentMax = axisValues.xAxisMax;
        statistics.chartConfig.yAxis.currentMin = axisValues.yAxisMin;
        statistics.chartConfig.yAxis.currentMax = axisValues.yAxisMax;
    }

    /**
     * Sets the titles for the x and y axis as well as the title of the chart.
     */
    function setChartTitles() {
        console.log(statistics.selectedPreset.xAxis.name);
        statistics.chartConfig.xAxis.title = {text: statistics.selectedPreset.xAxis.name};
        statistics.chartConfig.yAxis.title = {text: statistics.selectedPreset.yAxis.name};
        statistics.chartConfig.title = {text: statistics.selectedPreset.name};
    }

    /**
     * Removes the current data series from the charts.
     */
    function removeActiveSeries() {
        setChartSeries({});
    }

    $scope.$on('summonerSet', function () {
        retrievePageData();
    });

    $scope.$watch('statistics.selectedPreset', function (oldValue, newValue) {
        console.debug('Changed preset from', oldValue, 'to', newValue);
        removeActiveSeries();
        fillChartWithMatchHistoryData();
    });
}