'use strict';

angular.module('leagueApp.statistics.maingraph', ['highcharts-ng'])
    .controller('MaingraphCtrl', maingraphController);

maingraphController.$inject = ['$scope', '$log'];

function maingraphController($scope, log) {
    var maingraph = this, // jshint ignore:line
        matchDetails =  $scope.statistics.matchDetails,
        summoner =      $scope.statistics.selectedSummoner;

    var stat = {
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
        },
        champion: {
            name: 'Champion',
            value: function (data) {
                log.info(data);
                return data.championId;
            }
        }
    };

    maingraph.xAxisOptions = [
        {
            data: stat.game, title: 'Game', ticked: true
        }, {
            data: stat.date, title: 'Date', ticked: false
        }, {
            data: stat.gameLength, title: 'Game length', ticked: false
        }, {
            data: stat.cs, title: 'Minions killed', ticked: false
        }, {
            data: stat.averageCs, title: 'Minions killed per minute', ticked: false
        }, {
            data: stat.kills, title: 'Kills', ticked: false
        }, {
            data: stat.deaths, title: 'Deaths', ticked: false
        }, {
            data: stat.assists, title: 'Assists', ticked: false
        }, {
            data: stat.kda, title: 'KDA ratio', ticked: false
        }, {
            data: stat.won, title: 'Won', ticked: false
        }, {
                     data: stat.champion, title: 'Champion', ticked: false
                 }
    ];

    maingraph.yAxisOptions = [
        {
            data: stat.cs, title: 'Minions killed', ticked: true
        }, {
            data: stat.averageCs, title: 'Minions killed per minute', ticked: false
        }, {
            data: stat.kills, title: 'Kills', ticked: false
        }, {
            data: stat.deaths, title: 'Deaths', ticked: false
        }, {
            data: stat.assists, title: 'Assists', ticked: false
        }, {
            data: stat.kda, title: 'KDA ratio', ticked: false
        }, {
            data: stat.won, title: 'Won', ticked: false
        }, {
            data: stat.champion, title: 'Champion', ticked: false
        }
    ];

    maingraph.graphTypeOptions = [
        {
            key: 'spline', title: 'Line', ticked: true
        }, {
            key: 'column', title: 'Column', ticked: false
        }, {
            key: 'scatter', title: 'Points', ticked: false
        }
    ];


    //The current summoners which are shown in the chart.
    maingraph.currentDatasets = [matchDetails];
    maingraph.xAxisSelection = maingraph.xAxisOptions[0];
    maingraph.yAxisSelections = maingraph.yAxisOptions[0];
    maingraph.graphTypeSelection = maingraph.graphTypeOptions[0];

    //This is not a highcharts object. It just looks a little like one!
    maingraph.chartConfig = {
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
        log.debug('In fill chart func with', maingraph.currentDatasets);
        maingraph.chartConfig.loading = true;

        var dataSeries = [],
            highchartsObj = maingraph.chartConfig.getHighcharts(),
            xAxisSelection = maingraph.xAxisSelection[0];

        // Manually remove all previous yAxes since highcharts-ng does not support it yet
        removeYAxes(highchartsObj);

        // Loop per y-axis selection
        angular.forEach(maingraph.yAxisSelections, function (yAxisSelection, yAxisIndex) {
            var axisBoundaries = { yAxisMin: null, yAxisMax: null };

            // Loop per data set for creating series
            angular.forEach(maingraph.currentDatasets, function (dataset) {
                var serie = {
                        yAxis: yAxisIndex,
                        name: summoner.name
                    },
                    data = [];

                // Loop per matchHistory data
                angular.forEach(dataset, function (match, index) {
                    var xValue = xAxisSelection.data.value(match, index),
                        yValue = yAxisSelection.data.value(match);

                    data.push([xValue, yValue]);
                    axisBoundaries = calculateYAxisBoundaries(axisBoundaries, yValue);
                });

                serie.data = data;
                serie.type = maingraph.graphTypeSelection[0].key;
                dataSeries.push(serie);
            });

            // Adding Axis dynamically via highcharts-ng doesn't work unfortunately
            addYAxis(highchartsObj, yAxisSelection, axisBoundaries);
        });

        // Set type of xAxis
        maingraph.chartConfig.xAxis.type = (xAxisSelection.data.type) ? xAxisSelection.data.type : 'linear';

        setChartSeries(dataSeries);

        maingraph.chartConfig.loading = false;
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
     * Set the data series for the active chart.
     * @param series
     *      The series to use in the chart.
     */
    function setChartSeries(series) {
        maingraph.chartConfig.series = series;
    }

    /**
     * Removes the current data series from the charts.
     */
    function removeActiveSeries() {
        setChartSeries({});
    }

    $scope.$watchGroup(['maingraph.xAxisSelection', 'maingraph.yAxisSelections', 'maingraph.graphTypeSelection'],
        function (oldValue, newValue) {
            if (!angular.equals(oldValue, newValue)) {
                removeActiveSeries();
                fillChartWithMatchHistoryData();
            }
        }
    );
}