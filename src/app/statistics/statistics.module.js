'use strict';

(function() {
    angular.module('leagueApp.statistics', [
        'rzModule',
        'leagueApp.statistics.maingraph',
        'leagueApp.statistics.bestChamp',
        'leagueApp.statistics.bestLane'
    ]);
})();