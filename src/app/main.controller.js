'use strict';

(function() {
angular
    .module('leagueApp.leagueProjecto', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/leagueProject-index.html',
            controller: 'LeagueProjectoMainPageCtrl',
            controllerAs: 'main'
        });
    }])
    .controller('LeagueProjectoMainPageCtrl', mainController);

mainController.$inject = ['$scope'];

function mainController($scope) {
    var basePage = this; // jshint ignore:line

    basePage.template = {
        summonerSelector: 'app/summoner/summoner.html',
        statistics: 'app/statistics/statistics.html'
    };

    $scope.$on('SummonerSelected', function (event, args) {
        $scope.$broadcast('summonerSet');
    });
}

})();