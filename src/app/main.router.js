'use strict';

(function() {
angular
    .module('analyzedggApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('landingspage', {
                url: '/',
                templateUrl: 'app/landingspage/landingspage.html'
            })
            .state('soloStatistics', {
                url: '/:region/:summonerName/?min&max&champion&patch&win',
                templateUrl: 'app/statistics/statistics.html',
                controller: 'StatisticsCtrl',
                controllerAs: 'statistics'
            });
    });
})();