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

        $scope.usernameInput = 'Minikoen';

        $scope.retrievePageData = function () {
            var activeRegion = stateService.getActiveRegion();
            var summonerName = $scope.usernameInput;

            $scope.summonerData = summonerInfoService.getSummoner(activeRegion, summonerName);

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

        $scope.$watch('regionCodeInput', function (newRegion, oldRegion) {
            console.log('Region changed from', oldRegion, 'to', newRegion);
            stateService.setActiveRegion(newRegion);
        });

    }]
)
;