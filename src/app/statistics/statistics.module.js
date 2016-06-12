'use strict';

(function() {
    angular.module('leagueApp.statistics', [
        'leagueApp.statistics.maingraph',
        'leagueApp.statistics.matchSlider',
        'leagueApp.statistics.bestChamp',
        'leagueApp.statistics.bestLane',
        'leagueApp.statistics.bestPatch'
    ]);
})();