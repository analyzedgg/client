'use strict';

angular.module('leagueApp.service')
    .service('MatchesFilterService', matchesFilterService);

matchesFilterService.$inject = ['$stateParams', 'ChampionInfoService', 'DataFormatService'];

function matchesFilterService($stateParams, championInfoService, dataFormatService) {
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

        if (champion && champion.id) {
            return match.championId === champion.id;
        }
        
        return true;
    }

    function patchFilter(match) {
        var patch = $stateParams.patch;

        if (patch) {
            return match.matchVersion.substring(0, patch.length) === patch;
        }

        return true;
    }

    function laneFilter(match) {
        var lane = $stateParams.lane;

        if (lane) {
            return dataFormatService.simplifyLane(match.lane, match.role) === lane;
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
            .filter(laneFilter)
            .filter(winFilter);
    }
}