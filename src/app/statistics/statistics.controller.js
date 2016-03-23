'use strict';

angular.module('leagueApp.statistics_page', ['ngRoute', 'highcharts-ng'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/stats', {
            templateUrl: 'app/statistics/statistics.html',
            controller: 'StatisticsPageCtrl',
            controllerAs: 'statistics'
        });
    }])
    .controller('StatisticsPageCtrl', statisticsController);

statisticsController.$inject = ['$scope', '$log', 'MatchHistoryService', 'StateService'];

function statisticsController($scope, log, matchHistoryService, stateService) {
    var statistics = this; // jshint ignore:line

    var statistic = {
        game: {
            name: 'Games',
            value: function (data, index) {
                return index + 1;
            }
        },
        gameLength: {
            name: 'Minutes played',
            value: function (data) {
                return Math.round((data.matchDuration / 60) * 100) / 100;
            }
        },
        date: {
            name: 'Date',
            type: 'datetime',
            value: function (data) {
                return data.matchCreation;
            }
        },
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
        },
        won: {
            name: 'Wins',
            value: function (data) {
                return data.winner ? 1 : 0;
            }
        }
    };

    statistics.xAxisOptions = [
        {
            data: statistic.game, title: 'Game', ticked: true
        }, {
            data: statistic.date, title: 'Date', ticked: false
        }, {
            data: statistic.gameLength, title: 'Game length', ticked: false
        }, {
            data: statistic.cs, title: 'Minions killed', ticked: false
        }, {
            data: statistic.averageCs, title: 'Minions killed per minute', ticked: false
        }, {
            data: statistic.kills, title: 'Kills', ticked: false
        }, {
            data: statistic.deaths, title: 'Deaths', ticked: false
        }, {
            data: statistic.assists, title: 'Assists', ticked: false
        }, {
            data: statistic.kda, title: 'KDA ratio', ticked: false
        }
    ];

    statistics.yAxisOptions = [
        {
            data: statistic.cs, title: 'Minions killed', ticked: true
        }, {
            data: statistic.averageCs, title: 'Minions killed per minute', ticked: false
        }, {
            data: statistic.kills, title: 'Kills', ticked: false
        }, {
            data: statistic.deaths, title: 'Deaths', ticked: false
        }, {
            data: statistic.assists, title: 'Assists', ticked: false
        }, {
            data: statistic.kda, title: 'KDA ratio', ticked: false
        }, {
            data: statistic.won, title: 'Won', ticked: false
        }
    ];

    statistics.graphTypeOptions = [
        {
            key: 'spline', title: 'Line', ticked: true
        }, {
            key: 'column', title: 'Column', ticked: false
        }, {
            key: 'scatter', title: 'Points', ticked: false
        }
    ];


    //The current summoners which are shown in the chart.
    statistics.currentDatasets = [];
    statistics.xAxisSelection = statistics.xAxisOptions[0];
    statistics.yAxisSelections = statistics.yAxisOptions[0];
    statistics.graphTypeSelection = statistics.graphTypeOptions[0];

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

        //Title configuration (optional)
        title: {
            text: ''
        },
        //Boolean to control showng loading status on chart (optional)
        //Could be a string if you want to show specific loading text.
        loading: true,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
        xAxis: {},
        yAxis: {},
        //size (optional) if left out the chart will default to size of the div or something sensible.
        size: {
            width: 800,
            height: 600
        }
    };

    function retrievePageData() {
        delete statistics.matchHistoryError;
        var selection = {
            region: angular.copy(stateService.getActiveRegion()),
            summoner: angular.copy(stateService.getActiveSummoner())
        };

        if (!selectionInCurrentList(selection)) {
            getMatchHistory(selection.region, selection.summoner);
        }
    }

    /**
     * Retrieve the match data for a given region and summoner from the API.
     * @param region The selected region.
     * @param summoner The selected summoner.
     */
    function getMatchHistory(region, summoner) {
        log.info('Gonna perform the request for match history with the follow params:', summoner.id, region);
        var promise = matchHistoryService.matchHistory(region, summoner.id);
        promise.then(function (data) {
            var sortedArray = data.sort(function (a, b) {
                return a.matchCreation - b.matchCreation;
            });
            statistics.currentDatasets.push(
                {
                    selection: {
                        region: region,
                        summoner: summoner
                    },
                    matchHistory: sortedArray
                });
            fillChartWithMatchHistoryData();
        }).catch(function (errorResponse) {
            statistics.matchHistoryError = 'Could not retrieve match history for summoner with id ' + summoner.id + ' on the ' + region + 'servers';
            log.error('Error loading summoner info', errorResponse);
        });
    }

    function removeYAxes(highchartsObj) {
        var axesToRemove = [];
        angular.forEach(highchartsObj.axes, function (axis) {
            if (!axis.isXAxis) {
                axesToRemove.push(axis);
            }
        });
        // Immediately removing it from the highchartsObj.axes would alter the axes array which results in skipping axes
        angular.forEach(axesToRemove, function (axis) {
            axis.remove();
        });
    }

    function addYAxis(highchartsObj, yAxisSelection, axisBoundaries) {
        highchartsObj.addAxis({
            title: {
                text: yAxisSelection.title
            },
            min: axisBoundaries.yAxisMin,
            max: axisBoundaries.yAxisMax,
            type: (yAxisSelection.data.type) ? yAxisSelection.data.type : 'linear'
        });
    }

    /**
     * The main function for controlling, transforming and filling the chart.
     */
    function fillChartWithMatchHistoryData() {
        log.debug('In fill chart func with', statistics.currentDatasets);
        statistics.chartConfig.loading = true;

        var dataSeries = [],
            highchartsObj = statistics.chartConfig.getHighcharts(),
            xAxisSelection = statistics.xAxisSelection[0];

        // Manually remove all previous yAxes since highcharts-ng does not support it yet
        removeYAxes(highchartsObj);

        // Loop per y-axis selection
        angular.forEach(statistics.yAxisSelections, function (yAxisSelection, yAxisIndex) {
            var axisBoundaries = { yAxisMin: null, yAxisMax: null };

            // Loop per data set for creating series
            angular.forEach(statistics.currentDatasets, function (dataset) {
                var serie = {
                        yAxis: yAxisIndex,
                        name: dataset.selection.summoner.name
                    },
                    data = [];

                // Loop per matchHistory data
                angular.forEach(dataset.matchHistory, function (match, index) {
                    var xValue = xAxisSelection.data.value(match, index),
                        yValue = yAxisSelection.data.value(match);

                    data.push([xValue, yValue]);
                    axisBoundaries = calculateYAxisBoundaries(axisBoundaries, yValue);
                });

                serie.data = data;
                //dataSet.tooltip = statistics.selectedPreset.tooltip;
                serie.type = statistics.graphTypeSelection[0].key;
                dataSeries.push(serie);
            });

            // Adding Axis dynamically via highcharts-ng doesn't work unfortunately
            addYAxis(highchartsObj, yAxisSelection, axisBoundaries);
        });

        // Set type of xAxis
        statistics.chartConfig.xAxis.type = (xAxisSelection.data.type) ? xAxisSelection.data.type : 'linear';

        setChartSeries(dataSeries);

        statistics.chartConfig.loading = false;
    }

    /**
     * Calculate the new axis minimums and maximums for the chart.
     * @param axisValues
     *      The list of current min an max values.
     * @param yValue
     *      The match specific yValue.
     * @returns
     *      The updated array axisValues.
     */
    function calculateYAxisBoundaries(axisValues, yValue) {
        if (yValue > axisValues.yAxisMax || axisValues.yAxisMax === null) {
            axisValues.yAxisMax = yValue;
        }

        if (yValue < axisValues.yAxisMin || axisValues.yAxisMin === null) {
            axisValues.yAxisMin = yValue;
        }

        return axisValues;
    }

    /**
     * Check if the filled in summoner is already in the current summoners list.
     * @param selection
     *      The active selection.
     * @returns {boolean}
     *      Indicator if the summoner is already in the current summoners list.
     */
    function selectionInCurrentList(selection) {
        var match = false;
        angular.forEach(statistics.currentDatasets, function (dataset) {
            if (!match && angular.equals(dataset.selection, selection)) {
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
     * Removes the current data series from the charts.
     */
    function removeActiveSeries() {
        setChartSeries({});
    }

    $scope.$on('summonerSet', function () {
        retrievePageData();
    });

    $scope.$watchGroup(['statistics.xAxisSelection', 'statistics.yAxisSelections', 'statistics.graphTypeSelection'],
        function (oldValue, newValue) {
            if (!angular.equals(oldValue, newValue)) {
                removeActiveSeries();
                fillChartWithMatchHistoryData();
            }
        });
}