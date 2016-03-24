'use strict';

angular.module('leagueApp.statistics', [])
    .controller('StatisticsCtrl', statisticsController);

statisticsController.$inject = ['$scope', '$log', 'simpleObj'];

function statisticsController($scope, log, simpleObj) {
    var statistics = this; // jshint ignore:line

    log.log(simpleObj);

    statistics.template = {
        maingraph: 'app/statistics/maingraph/maingraph.html'
    };
}