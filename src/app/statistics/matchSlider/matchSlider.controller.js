'use strict';

angular.module('leagueApp.statistics.matchSlider', ['rzModule'])
    .controller('MatchSliderCtrl', matchSliderController);

matchSliderController.$inject = ['$scope', '$state', '$stateParams', 'ENV'];

function matchSliderController($scope, $state, $stateParams, ENV) {
    var matchSlider = this, // jshint ignore:line
        rawMatchDetails = $scope.statistics.rawMatchDetails;

    var numberOfMatches = rawMatchDetails.length;

    matchSlider.min = ($stateParams.min > 1 && $stateParams.min < numberOfMatches) ? $stateParams.min : 1;
    matchSlider.max = ($stateParams.max > 1 && $stateParams.max < numberOfMatches) ? $stateParams.max : numberOfMatches;
    matchSlider.options = {
        floor: 1,
        ceil: numberOfMatches,
        minRange: ENV.MINIMUM_RANKED_GAMES,
        onEnd: onSlideEnd,
        translate: function(value) {
            var matchDate = rawMatchDetails[value - 1].matchCreation;
            var date = moment(matchDate).format("MMM Do YYYY");
            return date + " (#" + value + ")";
        }
    };

    //////////

    function onSlideEnd(sliderId, min, max) {
        var queryParams = {
            min: (min > 1) ? min : null,
            max: (max < numberOfMatches) ? max : null
        };

        $state.go('.', queryParams);
    }
}