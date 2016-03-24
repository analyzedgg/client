'use strict';

(function() {
angular
    .module('leagueApp', [
        'ui.router',
        'ngResource',
        'leagueApp.summoner',
        'leagueApp.statistics',
        'leagueApp.service.summonerInfo',
        'leagueApp.service.matchHistory',
        'leagueApp.service.championInfo',
        'leagueApp.service.state'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main.html',
                controller: mainController,
                controllerAs: 'main'
            })
            .state('main.soloStatistics', {
                url: '{region}/{summonerName}/',
                templateUrl: 'app/statistics/statistics.html',
                controller: 'StatisticsCtrl',
                resolve: {
                    simpleObj: function(){
                        return {value: 'simple!'};
                    }
                }
            });
    })
    .controller('MainCtrl', mainController);

function mainController() {
    var basePage = this; // jshint ignore:line

    basePage.template = {
        summonerSelector: 'app/summoner/summoner.html',
        statistics: 'app/statistics/statistics.html'
    };
}

})();