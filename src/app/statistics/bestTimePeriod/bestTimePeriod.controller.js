'use strict';

angular.module('analyzedggApp.statistics.bestTimePeriod')
    .controller('BestTimePeriodCtrl', bestTimePeriodController);

bestTimePeriodController.$inject = ['$scope', '$state', 'BestTimePeriodService'];

function bestTimePeriodController($scope, $state, bestTimePeriodService) {
    var bestTimePeriod = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails,
        selectedSummoner = $scope.statistics.selectedSummoner;

    //////////
    init();

    function init() {
        var result = bestTimePeriodService.calculate(matchDetails);
        bestTimePeriod.timePeriod = result[result.bestPeriod];
        bestTimePeriod.summoner = selectedSummoner.name;
    }
}