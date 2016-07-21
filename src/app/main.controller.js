'use strict';

(function() {
angular
    .module('leagueApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main.html',
                controller: mainController,
                controllerAs: 'main'
            })
            .state('main.about', {
                url: 'about',
                templateUrl: 'app/about/about.html'
            })
            .state('main.soloStatistics', {
                url: ':region/:summonerName/?min&max&champion&patch&win',
                templateUrl: 'app/statistics/statistics.html',
                controller: 'StatisticsCtrl',
                controllerAs: 'statistics'
            });
    }).controller('MainCtrl', mainController);

    function mainController() {
        var basePage = this; // jshint ignore:line

        basePage.template = {
            summonerSelector: 'app/summoner/summoner.html',
            statistics: 'app/statistics/statistics.html'
        };
    }
})();