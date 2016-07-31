'use strict';

angular.module('leagueApp.service')
    .service('BaseChartConfigService', BaseChartConfigService);

function BaseChartConfigService() {
    return {
        pieWithWinRate: function(title, mainSeriesName) {
            return {
                options: {
                    chart: {
                        type: "pie",
                        backgroundColor: null
                    }
                },
                title: {
                    text: title
                },
                subtitle: {
                    text: ''
                },
                series: [{
                    name: mainSeriesName,
                    data: [],
                    size: '90%',
                    id: "MainSeries",
                    dataLabels: {
                        color: '#ffffff',
                        distance: -40
                    }
                }, {
                    name: 'Ratio',
                    data: [],
                    size: '100%',
                    innerSize: '90%',
                    id: "WinLoseRatio",
                    dataLabels: {
                        formatter: function () {
                            return null;
                        }
                    }
                }],
                loading: false
            };
        },

        columnWithWinRateAndKDA: function(title) {
            return {
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
                            return "<b>" + this.series.name + "</b>: " + (+this.y.toFixed(2));
                        }
                    }
                },
                title: {
                    text: title
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
        }
    }
}