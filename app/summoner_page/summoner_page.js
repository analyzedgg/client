'use strict';

angular.module('leagueApp.summoner_page', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/summoner', {
            templateUrl: 'summoner_page/summoner_page.html',
            controller: 'SummonerPageCtrl',
            controllerAs: 'summoner'
        });
    }])
    .controller('SummonerPageCtrl', summonerController);

summonerController.$inject = ['$scope', 'SummonerInfoService', 'StateService'];

function summonerController($scope, summonerInfoService, stateService) {
    var summoner = this;
    summoner.regions = [
        {name: 'West Europe', code: 'euw'},
        {name: 'North America', code: 'na'},
        {name: 'Korea', code: 'kr'},
        {name: 'Brazil', code: 'br'},
        {name: 'Europe Nordic & East', code: 'eune'},
        {name: 'Latin America South', code: 'las'},
        {name: 'Oceania', code: 'oce'},
        {name: 'Russia', code: 'rus'},
        {name: 'Turkey', code: 'tr'}
    ];

    summoner.usernameInput = 'Minikoen';

    summoner.retrievePageData = function () {
        var activeRegion = stateService.getActiveRegion();
        var summonerName = summoner.usernameInput;

        getSummonerInfo(activeRegion, summonerName);

    };

    function getSummonerInfo(region, summonerName) {
        console.log('Gonna perform the request for summoner info with the follow params:', summonerName, region);
        var promise =  summonerInfoService.summoner(region, summonerName);
        promise.then(function(data) {
            summoner.summonerData = data;
            console.log('In de controller', data);
        }).catch(function(errorResponse) {
            console.log('Error loading summoner info', errorResponse);
        });
    }

    $scope.$watch('summoner.regionCodeInput', function (newRegion, oldRegion) {
        console.log('Region changed from', oldRegion, 'to', newRegion);
        stateService.setActiveRegion(newRegion);
    });

}