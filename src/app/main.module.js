'use strict';

(function() {
    angular
        .module('leagueApp', [
            'ui.router',
            'ngResource',
            'leagueApp.summoner',
            'leagueApp.statistics',
            'leagueApp.service',
            'leagueApp.analytics'
        ]);
})();