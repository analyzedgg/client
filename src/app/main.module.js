'use strict';

(function() {
    angular
        .module('analyzedggApp', [
            'ui.router',
            'ngResource',
            'analyzedggApp.summoner',
            'analyzedggApp.statistics',
            'analyzedggApp.service',
            'analyzedggApp.analytics'
        ]);
})();