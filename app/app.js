'use strict';

// Declare app level module which depends on views, and components
angular.module('leagueApp', [
    'ngRoute',
    'ngResource',
    'leagueApp.summoner_page',
    'leagueApp.service.summonerInfo',
    'leagueApp.service.state'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/summoner'});
    }])
;