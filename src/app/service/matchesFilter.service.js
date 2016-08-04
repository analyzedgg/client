'use strict';

angular.module('leagueApp.service')
    .service('MatchesFilterService', matchesFilterService);

matchesFilterService.$inject = ['$stateParams', 'ChampionInfoService'];

function matchesFilterService($stateParams, championInfoService) {
    return {
        filter: filter
    };
    
    // filter functions
    function getMinMax(matches) {
        var minParam = $stateParams.min || 1;
        var maxParam = $stateParams.max || matches.length;

        var min = (minParam >= 1 && minParam <= maxParam) ? minParam : 1;
        var max = (maxParam <= matches.length && maxParam >= minParam) ? maxParam : matches.length;

        return {
            min: min,
            max: max
        };
    }

    function championFilter(match) {
        var championName = $stateParams.champion,
            champion = championInfoService.championByName(championName);

        if (champion) {
            return match.championId === champion.id;
        }
        
        return true;
    }

    function patchFilter(match) {
        var patch = $stateParams.patch;

        if (patch) {
            return match.matchVersion.startsWith(patch);
        }

        return true;
    }

    function winFilter(match) {
        var win = $stateParams.win;

        if (win) {
            var winBoolean = win === 'true';
            return match.winner === winBoolean;
        }

        return true;
    }

    ////////////////////////////////////////
    
    function filter(matches) {
        var limit = getMinMax(matches);

        return matches
            .slice(limit.min - 1, limit.max)
            .filter(championFilter)
            .filter(patchFilter)
            .filter(winFilter);
    }
}