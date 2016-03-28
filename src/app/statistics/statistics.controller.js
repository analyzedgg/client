'use strict';

angular.module('leagueApp.statistics')
    .controller('StatisticsCtrl', statisticsController);

statisticsController.$inject = ['$scope', '$log', 'matchDetails'];

function statisticsController($scope, log, matchDetails) {
    var statistics = this; // jshint ignore:line

    log.log(matchDetails);

    statistics.template = {
        maingraph: 'app/statistics/maingraph/maingraph.html'
    };
}