'use strict';

// Declare app level module which depends on views, and components
angular.module('leagueAPIApp', [
    'ngRoute',
    'ngResource',
    'leagueAPIApp.home',
    'leagueAPIApp.summoner_page',
    'leagueAPIApp.service.summonerInfo',
    'leagueAPIApp.service.statistics',
    'leagueAPIApp.service.champion',
    'leagueAPIApp.service.state'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }])
;