'use strict';

angular.module('leagueApp.statistics_page', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/stats', {
            templateUrl: 'statistics_page/statistics_page.html',
            controller: 'StatisticsPageCtrl',
            controllerAs: 'statistics'
        });
    }])
    .controller('StatisticsPageCtrl', statisticsController);

statisticsController.$inject = ['MatchHistoryService', 'StateService'];

function statisticsController(matchHistoryService, stateService) {
    var statistics = this;
    statistics.chartypes = [{value: 'pie'}, {value: 'bar'}, {value: 'line'}, {value: 'point'}, {value: 'area'}];

    statistics.chartType = 'point';
    statistics.config = {
        title: 'Leauge Stats',
        tooltips: true,
        labels: true,
        mouseover: function () {
        },
        mouseout: function () {
        },
        click: function () {
        },
        legend: {
            display: true,
            //could be 'left, right'
            position: 'left'
        },
        innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
        lineLegend: 'lineEnd' // can be also 'traditional'
    };

    statistics.retrievePageData = function () {
        delete statistics.matchHistoryError;
        var activeRegion = stateService.getActiveRegion();
        var summonerId = stateService.getActiveSummoner().id;

        getMatchHistory(activeRegion, summonerId);

    }();

    function getMatchHistory(region, summonerId) {
        console.log('Gonna perform the request for match history with the follow params:', summonerId, region);
        var promise = matchHistoryService.matchHistory(region, summonerId);
        promise.then(function (data) {
            fillChartWithMatchHistoryData(data);
        }).catch(function (errorResponse) {
            statistics.matchHistoryError = 'Could not retrieve match history for summoner with id ' + summonerId + ' on the ' + region + 'servers';
            console.error('Error loading summoner info', errorResponse);
        });
    }

    function fillChartWithMatchHistoryData(matchHistory) {
        var x = [];
        var data = [];
        angular.forEach(matchHistory, function (match, index) {
            var xValue = 'Match ' + (index +1);
            var yValue = [match.stats.minionKills];
            var toolTip = 'This match lasted ' + Math.round(match.matchDuration / 60) + ' minutes';
            x.push(xValue);
            data.push({x: xValue, y: yValue, "tooltip": toolTip});
        });
        statistics.plotData = {
            "series": x,
            "data": data
        };
    }
}