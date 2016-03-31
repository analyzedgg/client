'use strict';

angular.module('leagueApp.statistics.mostWins', ['highcharts-ng'])
    .controller('MostWinsCtrl', mostWinsController);

mostWinsController.$inject = ['$scope', '$log'];

function mostWinsController($scope, log) {
    var mostWins = this, // jshint ignore:line
        matchDetails =  $scope.statistics.matchDetails,
        summoner =      $scope.statistics.selectedSummoner;

    var stat = {
        champion: {
            name: 'Champion',
            value: function (data) {
                log.info(data);
                return data.championId;
            }
        },
        won: {
            name: 'Wins',
            value: function (data) {
                return data.winner ? 1 : 0;
            }
        }
    };

    //The current summoners which are shown in the chart.
    mostWins.currentDatasets = [matchDetails];
    mostWins.xAxisSelection = {data: stat.champion, title: 'Champion', ticked: true};
    mostWins.yAxisSelection = {data: stat.won, title: 'Won', ticked: true};
    mostWins.graphTypeSelection = {key: 'column', title: 'Column', ticked: true};

    //This is not a highcharts object. It just looks a little like one!
    mostWins.chartConfig = {
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

    fillChartWithMatchHistoryData();

    /**
     * The main function for controlling, transforming and filling the chart.
     */
    function fillChartWithMatchHistoryData() {
        log.debug('In fill chart func for mostWins with', mostWins.currentDatasets);
        mostWins.chartConfig.loading = true;

        var dataSeries = [];

        var axisBoundaries = { yAxisMin: null, yAxisMax: null };

        // Loop per data set for creating series
        angular.forEach(mostWins.currentDatasets, function (dataset) {
            var serie = {
                    yAxis: 0,
                    name: summoner.name
                },
                data = [];

            // Loop per matchHistory data
            angular.forEach(dataset, function (match, index) {
                var xValue = mostWins.xAxisSelection.data.value(match);
                var yValue = mostWins.yAxisSelection.data.value(match);

                data.push([xValue, yValue]);
                axisBoundaries = calculateYAxisBoundaries(axisBoundaries, yValue);
            });

            serie.data = data;
            serie.type = mostWins.graphTypeSelection;
            dataSeries.push(serie);
        });


        // Set type of xAxis
        mostWins.chartConfig.xAxis.type = 'linear';

        setChartSeries(dataSeries);

        mostWins.chartConfig.loading = false;
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
        mostWins.chartConfig.series = series;
    }

    /**
     * Removes the current data series from the charts.
     */
    function removeActiveSeries() {
        setChartSeries({});
    }
}