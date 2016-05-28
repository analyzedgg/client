'use strict';

angular.module('leagueApp.statistics.matchSlider', ['rzModule'])
    .controller('MatchSliderCtrl', matchSliderController);

matchSliderController.$inject = ['$scope', '$state', '$stateParams', 'ENV'];

function matchSliderController($scope, $state, $stateParams, ENV) {
    var matchSlider = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    var numberOfMatches = matchDetails.length;

    matchSlider.min = ($stateParams.min > 0 && $stateParams.min < numberOfMatches) ? $stateParams.min : 0;
    matchSlider.max = ($stateParams.max > 0 && $stateParams.max < numberOfMatches) ? $stateParams.max : numberOfMatches;
    matchSlider.options = {
        floor: 0,
        ceil: numberOfMatches,
        minRange: ENV.MINIMUM_RANKED_GAMES,
        showTicks: Math.ceil(numberOfMatches / 10),
        onEnd: onSlideEnd
    };

    //////////

    function onSlideEnd(sliderId, min, max) {
        var queryParams = {
            min: (min > 0) ? min : null,
            max: (max < numberOfMatches) ? max : null
        };

        $state.go('.', queryParams);
    }

    init();

    function init() {
        var minParam = $stateParams.min || 0;
        var maxParam = $stateParams.max || 60;

        var min = (minParam >= 0 && minParam < maxParam) ? minParam : 0;
        var max = (maxParam <= numberOfMatches && maxParam > minParam) ? maxParam : numberOfMatches;

        for (var i = 0; i < min; i++) {
            matchDetails.shift();
        }
        for (var j = 0; j < numberOfMatches - max; j++) {
            matchDetails.pop();
        }
    }
}