'use strict';

angular.module('leagueApp.summoner_page', ['ngRoute', 'ui.bootstrap', 'isteven-multi-select'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/summoner', {
            templateUrl: 'app/summoner/summoner.html',
            controller: 'SummonerPageCtrl',
            controllerAs: 'summoner'
        });
    }])
    .controller('SummonerPageCtrl', summonerController);

summonerController.$inject = ['$scope', '$log', 'SummonerInfoService', 'StateService', 'ChampionInfoService'];

function summonerController($scope, log, summonerInfoService, stateService, championInfoService) {
    var summoner = this; // jshint ignore:line

    activate();

    ///////////////////////

    function activate() {
        //Controller variables
        summoner.regions = {
            'euw': 'EUW',
            'na': 'NA',
            'kr': 'KR',
            'br': 'BR',
            'eune': 'EUNE',
            'las': 'LAS',
            'lan': 'LAN',
            'oce': 'OCE',
            'rus': 'RUS',
            'tr': 'TR'
        };

        // Default values
        summoner.usernameInput = '';
        summoner.region = 'euw';

        summoner.retrievePageData = retrievePageData;
    }

    function retrievePageData() {
        delete summoner.summonerError;
        var activeRegion = summoner.region;
        var summonerName = summoner.usernameInput;

        getSummonerInfo(activeRegion, summonerName);
    }

    function getSummonerInfo(region, summonerName) {
        log.debug('Gonna perform the request for summoner info with the follow params:', summonerName, region);
        var promise = summonerInfoService.summoner(region, summonerName);
        promise.then(function (data) {
            stateService.setActiveSummoner(data.response);
            stateService.setActiveRegion(region);

            $scope.$emit('SummonerSelected');
        }).catch(function (errorResponse) {
            summoner.summonerError = summonerName + ' not found on region ' + region;
            log.error('Error loading summoner info', errorResponse);
        });
    }

}