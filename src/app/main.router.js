'use strict';

(function() {
angular
    .module('leagueApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('landingspage', {
                url: '/',
                templateUrl: 'app/landingspage/landingspage.html'
            })
            .state('soloStatistics', {
                url: '/:region/:summonerName/?min&max&champion&lane&patch&win',
                templateUrl: 'app/statistics/statistics.html',
                controller: 'StatisticsCtrl',
                controllerAs: 'statistics'
            });
    });
})();