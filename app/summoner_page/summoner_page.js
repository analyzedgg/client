'use strict';

angular.module('leagueApp.summoner_page', ['ngRoute', 'ui.bootstrap'])

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

    summoner.queueTypes = {
        '': {
            small: 'All',
            full: 'All'
        },
        'RANKED_SOLO_5x5': {
            small: 'Solo 5v5',
            full: 'Ranked 5v5 (solo)'
        },
        'RANKED_TEAM_5x5': {
            small: 'Team 5v5',
            full: 'Ranked 5v5 (team)'
        },
        'RANKED_TEAM_3x3': {
            small: 'Team 3v3',
            full: 'Ranked 3v3 (team)'
        }
    };

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
            stateService.setActiveSummoner(data.response);
            $scope.$emit('SummonerSelected');
        }).catch(function (errorResponse) {
            summoner.summonerError = summonerName + ' not found on region ' + region;
            console.error('Error loading summoner info', errorResponse);
        });
    }

    summoner.setRegion = function(region) {
        stateService.setActiveRegion(region);
        summoner.region = region;
    };

    summoner.setQueueType = function(queueType) {
        summoner.queueType = queueType;
    };


    // Default values
    summoner.usernameInput = '';
    summoner.region = '';
    summoner.setRegion('euw');
    summoner.queueType = '';
}