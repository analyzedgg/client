'use strict';

angular.module('leagueApp.leagueProjecto', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'leagueProjecto_mainPage.html',
            controller: 'LeagueProjectoMainPageCtrl',
            controllerAs: 'mainPage'
        });
    }])
    .controller('LeagueProjectoMainPageCtrl', leagueProjectoController);

leagueProjectoController.$inject = ['$scope', 'StateService'];

function leagueProjectoController($scope, stateService) {
    var basePage = this;

    basePage.template = {
        summonerSelector: 'summoner_page/summoner_page.html',
        statistics: 'statistics_page/statistics_page.html'
    };

    $scope.$on('SummonerSelected', function (event, args) {
        $scope.$broadcast('summonerSet');
    });
}