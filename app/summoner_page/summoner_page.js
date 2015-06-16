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
        {name: 'EUW', code: 'euw'},
        {name: 'NA', code: 'na'},
        {name: 'KR', code: 'kr'},
        {name: 'BR', code: 'br'},
        {name: 'EUNE', code: 'eune'},
        {name: 'LAS', code: 'las'},
        {name: 'LAN', code: 'lan'},
        {name: 'OCE', code: 'oce'},
        {name: 'RUS', code: 'rus'},
        {name: 'TR', code: 'tr'}
    ];

    summoner.usernameInput = 'Minikoen';

    summoner.retrievePageData = function () {
        delete summoner.summonerError;
        var activeRegion = stateService.getActiveRegion();
        var summonerName = summoner.usernameInput;

        getSummonerInfo(activeRegion, summonerName);

    };

    function getSummonerInfo(region, summonerName) {
        console.debug('Gonna perform the request for summoner info with the follow params:', summonerName, region);
        var promise = summonerInfoService.summoner(region, summonerName);
        promise.then(function (data) {
            console.log('Summoner data', data);
            stateService.setActiveSummoner(data.response);
            $scope.$emit('SummonerSelected');
            console.log('Broadcasted summonerSelected');
        }).catch(function (errorResponse) {
            summoner.summonerError = summonerName + ' not found on region ' + region;
            console.error('Error loading summoner info', errorResponse);
        });
    }

    $scope.$watch('summoner.regionCodeInput', function (newRegion, oldRegion) {
        console.debug('Region changed from', oldRegion, 'to', newRegion);
        stateService.setActiveRegion(newRegion);
    });

}