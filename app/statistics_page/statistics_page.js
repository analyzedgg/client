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

    //The possible filtering options for the x axis.
    //var xAxisPresets = {
    //    byGame: {
    //        name: 'Games',
    //        value: function (data, index) {
    //            return index + 1;
    //        }
    //    },
    //    byMinute: {
    //        name: 'Minutes played',
    //        value: function (data) {
    //            return Math.round((data.matchDuration / 60) * 100) / 100;
    //        }
    //    },
    //    byDate: {
    //        name: 'Date',
    //        type: 'datetime',
    //        value: function (data) {
    //            return data.matchCreation;
    //        }
    //    }
    //};
    ////The possible filtering options for the y axis.
    //var yAxisPresets = {
    //    cs: {
    //        name: 'CS',
    //        value: function (data) {
    //            return data.stats.minionKills;
    //        }
    //    },
    //    averageCs: {
    //        name: 'Average CS',
    //        value: function (data) {
    //            return Math.round(data.stats.minionKills / (data.matchDuration / 60) * 100) / 100;
    //        }
    //    },
    //    kills: {
    //        name: 'Kills',
    //        value: function (data) {
    //            return data.stats.kills;
    //        }
    //    },
    //    deaths: {
    //        name: 'Deaths',
    //        value: function (data) {
    //            return data.stats.deaths;
    //        }
    //    },
    //    assists: {
    //        name: 'Assists',
    //        value: function (data) {
    //            return data.stats.assists;
    //        }
    //    },
    //    kda: {
    //        name: 'KDA',
    //        value: function (data) {
    //            var killAssists = data.stats.kills + data.stats.assists;
    //            var deaths = data.stats.deaths || 1;
    //            return Math.round(((killAssists) / deaths) * 100) / 100;
    //        }
    //    }
    //};

    //The possible chart options
    //[{value: 'line'}, {value: 'spline'}, {value: 'area'}, {value: 'areaspline'}, {value: 'column'}, {value: 'bar'}, {value: 'pie'}, {value: 'scatter'});

    //statistics.chartPresets = [
    //    {
    //        name: 'CS per game',
    //        type: 'spline',
    //        xAxis: xAxisPresets.byGame,
    //        yAxis: yAxisPresets.cs,
    //        tooltip: {
    //            pointFormat: 'Game {point.x}, {point.y} cs.'
    //        }
    //    },
    //    {
    //        name: 'Average cs per minute per game',
    //        type: 'scatter',
    //        xAxis: xAxisPresets.byMinute,
    //        yAxis: yAxisPresets.averageCs,
    //        tooltip: {
    //            pointFormat: '{point.x} minutes played, {point.y} average cs per minute.'
    //        }
    //    },
    //    {
    //        name: 'KDA per game',
    //        type: 'spline',
    //        xAxis: xAxisPresets.byGame,
    //        yAxis: yAxisPresets.kda,
    //        tooltip: {
    //            pointFormat: 'Game {point.x}, {point.y} KDA.'
    //        }
    //    },
    //    {
    //        name: 'KDA per CS',
    //        type: 'scatter',
    //        xAxis: yAxisPresets.cs,
    //        yAxis: yAxisPresets.kda,
    //        tooltip: {
    //            pointFormat: '{point.x} CS, {point.y} KDA'
    //        }
    //    },
    //    {
    //        name: 'CS per date',
    //        type: 'scatter',
    //        xAxis: xAxisPresets.byDate,
    //        yAxis: yAxisPresets.cs,
    //        tooltip: {
    //            pointFormatter: function () {
    //                return this.y + ' CS on ' + new Date(this.x).toDateString();
    //            }
    //        }
    //    }
    //];

    //statistics.selectedPreset = statistics.chartPresets[0];

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
            summoner: angular.copy(stateService.getActiveSummoner()),
            queueType: angular.copy(stateService.getActiveQueueType()),
            champions: angular.copy(stateService.getActiveChampions())
        };

        if (!selectionInCurrentList(selection)) {
            getMatchHistory(selection.region, selection.summoner, selection.queueType, selection.champions);
        }
    }

    /**
     * Retrieve the match data for a given region and summoner from the API.
     * @param region The selected region.
     * @param summoner The selected summoner.
     * @param queueType The selected queue. ('', RANKED_SOLO_5x5, RANKED_TEAM_5x5, RANKED_TEAM_3x3)
     * @param champions A list of selected champion IDs.
     */
    function getMatchHistory(region, summoner, queueType, champions) {
        console.log('Gonna perform the request for match history with the follow params:', summoner.id, region, queueType, champions);
        var promise = matchHistoryService.matchHistory(region, summoner.id, queueType, champions);
        promise.then(function (data) {
            var sortedArray = data.response.sort(function (a, b) {
                return a.matchCreation - b.matchCreation;
            });
            statistics.currentDatasets.push(
                {
                    selection: {
                        region: region,
                        summoner: summoner,
                        queueType: queueType,
                        champions: champions
                    },
                    matchHistory: sortedArray
                });
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
        console.debug('In fill chart func with', statistics.currentDatasets);
        statistics.chartConfig.loading = true;

        var dataSeries = [],
            highchartsObj = statistics.chartConfig.getHighcharts(),
            xAxisSelection = statistics.xAxisSelection[0];

        // Manually remove all previous yAxes since highcharts-ng does not support it yet
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


        // Loop per y-axis selection
        angular.forEach(statistics.yAxisSelections, function (yAxisSelection, yAxisIndex) {
            var axisBoundaries = { xAxisMin: null, xAxisMax: null, yAxisMin: null, yAxisMax: null };

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
                    axisBoundaries = calculateAxisValues(axisBoundaries, xValue, yValue);
                });

                serie.data = data;
                //dataSet.tooltip = statistics.selectedPreset.tooltip;
                serie.type = statistics.graphTypeSelection[0].key;
                dataSeries.push(serie);
            });

            // Adding Axis dynamically via highcharts-ng doesn't work unfortunately
            highchartsObj.addAxis({
                title: {
                    text: yAxisSelection.title
                },
                min: axisBoundaries.yAxisMin,
                max: axisBoundaries.yAxisMax,
                type: (yAxisSelection.data.type) ? yAxisSelection.data.type : 'linear'
            });
        });

        // Set type of xAxis chart
        statistics.chartConfig.xAxis.type = (xAxisSelection.data.type) ? xAxisSelection.data.type : 'linear';

        setChartSeries(dataSeries);

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
        if (xValue > axisValues.xAxisMax || axisValues.xAxisMax === null) {
            axisValues.xAxisMax = xValue;
        }

        if (xValue < axisValues.xAxisMin || axisValues.xAxisMin === null) {
            axisValues.xAxisMin = xValue;
        }

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
     * Set the minimum and maximum values for the axis of the chart.
     * @param axisValues
     */
    function setChartAxisValues(axisValues) {
        statistics.chartConfig.xAxis.currentMin = axisValues.xAxisMin;
        statistics.chartConfig.xAxis.currentMax = axisValues.xAxisMax;
        statistics.chartConfig.yAxis.currentMin = axisValues.yAxisMin;
        statistics.chartConfig.yAxis.currentMax = axisValues.yAxisMax;
        statistics.chartConfig.xAxis.min = axisValues.xAxisMin;
        statistics.chartConfig.xAxis.max = axisValues.xAxisMax;
        statistics.chartConfig.yAxis.min = axisValues.yAxisMin;
        statistics.chartConfig.yAxis.max = axisValues.yAxisMax;
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
        //fillChartWithMatchHistoryData();
    });

    $scope.$watchGroup(['statistics.xAxisSelection', 'statistics.yAxisSelections', 'statistics.graphTypeSelection'],
        function (oldValue, newValue) {
            if (!angular.equals(oldValue, newValue)) {
                removeActiveSeries();
                fillChartWithMatchHistoryData();
            }
        });
}