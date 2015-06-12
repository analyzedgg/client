'use strict';

// Declare app level module which depends on views, and components
angular.module('leagueApp', [
    'ngRoute',
    'ngResource',
    'leagueApp.leagueProjecto',
    'leagueApp.summoner_page',
    'leagueApp.statistics_page',
    'leagueApp.service.summonerInfo',
    'leagueApp.service.matchHistory',
    'leagueApp.service.state'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', '')
;