'use strict';

angular.module('leagueAPIApp.summoner_page', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/summoner', {
            templateUrl: 'summoner_page/summoner_page.html',
            controller: 'SummonerPageCtrl'
        });
    }])

    .controller('SummonerPageCtrl', ['$scope', '$q', 'SummonerInfoService', 'StatisticsService', 'ChampionService', 'StateService', function ($scope, $q, summonerInfoService, statisticsService, championService, stateService) {

        $scope.regions = [
            {
                name: 'West Europe',
                code: 'euw'
            },
            {
                name: 'North America',
                code: 'na'
            },
            {
                name: 'Korea',
                code: 'kr'
            },
            {
                name: 'Brazil',
                code: 'br'
            },
            {
                name: 'Europe Nordic & East',
                code: 'eune'
            },
            {
                name: 'Latin America South',
                code: 'las'
            },
            {
                name: 'Oceania',
                code: 'oce'
            },
            {
                name: 'Russia',
                code: 'rus'
            },
            {
                name: 'Turkey',
                code: 'tr'
            }
        ];
        $scope.retrievePageData = function () {
            var activeRegion = stateService.getActiveRegion();
            var summonerName = $scope.usernameInput;

            var deferred = $q.defer();
            var promise = deferred.promise
                .then(getSummonerInfo(activeRegion, summonerName))
                .then(function (summonerInfo) {
                    console.log('Jobs done', summonerInfo);
                    var summonerId = stateService.getActiveSummoner()[angular.lowercase($scope.usernameInput)].id;
                    console.log(summonerId);
                })
                .then(getSummonerInfo(activeRegion, summonerName));

            /*
             //This method is needed for retrieving the summonerId
             getSummonerInfo(activeRegion, summonerName, function(response) {

             });*/

            /*            getSummonerStats(activeRegion, summonerId);
             getLeagueStats(activeRegion, summonerId);
             getMatchHistory(activeRegion, summonerId);

             $scope.testTitBit = statisticsService.lastPlayedChampions(activeRegion, summonerId);
             var championIds = $scope.testTitBit;

             console.log('request with ids: ', championIds);
             $scope.topThreeChampions = championService.getTopThreeChampions(activeRegion, championIds);*/
        };

        function getSummonerInfo(region, summonerName) {
            console.log('Gonna perform the request for summoner info with the follow params:', summonerName, region);
            return summonerInfoService.get({userNames: summonerName, region: region},
                function (response) {
                    $scope.summonerData = response;
                    stateService.setActiveSummoner(response[angular.lowercase(summonerName)]);
                },
                function (errorResponse) {
                    console.log('Something went wrong with the response for summoner info', errorResponse);
                });
        }

        function getSummonerStats(region, summonerId) {
            console.log('Gonna perform the request for summoner stats summary for id:', summonerId);
            statisticsService.summary.get({summonerId: summonerId, region: region},
                function (response) {
                    $scope.summonerStats = response;
                },
                function (errorResponse) {
                    console.log('Something went wrong with the response for summoner stats summary', errorResponse);
                });
        }

        function getLeagueStats(region, summonerId) {
            console.log('Gonna perform the request for league stats for summonerId:', summonerId);
            statisticsService.league.get({summonerId: summonerId, region: region},
                function (response) {
                    $scope.leagueStats = response;
                },
                function (errorResponse) {
                    console.log('Something went wrong with the response for league stats', errorResponse);
                });
        }

        function getMatchHistory(region, summonerId) {
            console.log('Gonna perform the request for match history stats for summonerId:', summonerId);
            statisticsService.matchHistory.get({summonerId: summonerId, region: region},
                function (response) {
                    $scope.matchHistory = response;
                },
                function (errorResponse) {
                    console.log('Something went wrong with the response for match history', errorResponse);
                })
        }

        $scope.$watch('regionCodeInput', function (newRegion, oldRegion) {
            console.log('Region changed from', oldRegion, 'to', newRegion);
            stateService.setActiveRegion(newRegion);
        });

    }]
);