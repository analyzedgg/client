'use strict';

angular.module('leagueApp.service')
    .service('MatchesFilterService', matchesFilterService);

matchesFilterService.$inject = ['$stateParams'];

function matchesFilterService($stateParams) {
    return {
        filter: filter
    };
    
    // filter functions
    function getMinMax(matches) {
        var minParam = $stateParams.min || 1;
        var maxParam = $stateParams.max || 60;

        var min = (minParam >= 1 && minParam < maxParam) ? minParam : 1;
        var max = (maxParam <= matches.length && maxParam > minParam) ? maxParam : matches.length;

        return {
            min: min,
            max: max
        };
    }
    
    ////////////////////////////////////////
    
    function filter(matches) {
        var limit = getMinMax(matches);

        return matches
            .slice(limit.min, limit.max)
    }
}