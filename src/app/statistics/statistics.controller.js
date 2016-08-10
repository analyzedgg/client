'use strict';

angular.module('leagueApp.statistics')
    .controller('StatisticsCtrl', statisticsController);

statisticsController.$inject = ['$stateParams', 'SummonerInfoService', 'MatchHistoryService', 'ENV', '$q', '$state'];

function statisticsController($stateParams, summonerInfoService, matchHistoryService, ENV, $q, $state) {
    var statistics = this; // jshint ignore:line

    angular.extend(statistics, {
        rawMatchDetails: [],
        matchDetails: [],
        selectedSummoner: {},
        loading: false,
        errorMessage: null,
        minimumGames: ENV.MINIMUM_RANKED_GAMES,
        summonerSelection: {
            region: $stateParams.region,
            summonerName: $stateParams.summonerName
        },
        template: {
            matchSlider: 'app/statistics/matchSlider/matchSlider.html',
            mostWins: 'app/statistics/bestChamp/bestChamp.html',
            bestLane: 'app/statistics/bestLane/bestLane.html',
            bestPatch: 'app/statistics/bestPatch/bestPatch.html',
            bestTeam: 'app/statistics/bestTeam/bestTeam.html',
            bestTimePeriod: 'app/statistics/bestTimePeriod/bestTimePeriod.html'
        }
    });

    //////////

    var loader = {
        show: function() {
            statistics.loading = true;
        },
        hide: function() {
            statistics.loading = false;
        }
    };

    var errorMessage = {
        show: function(message) {
            statistics.errorMessage = message;
        },
        hide: function() {
            statistics.errorMessage = null;
        }
    };

    function showDefaultErrorMessage() {
        errorMessage.show('Something went wrong, please try again later');
    }

    function fillSummonerDetails() {
        var region = $stateParams.region,
            summonerName = $stateParams.summonerName;

        var promise = summonerInfoService.summoner(region, summonerName);
        promise
            .then(function(summoner) {
                statistics.selectedSummoner = summoner;
            })
            .catch(function(error) {
                switch(error.status) {
                    case 404:
                        errorMessage.show('Could not find summoner ' + summonerName + ' on server ' + region);
                        break;
                    default:
                        showDefaultErrorMessage();
                }
            });

        return promise;
    }

    function fillMatchDetails(summoner) {
        var region = $stateParams.region,
            summonerName = $stateParams.summonerName,
            minGamesError = summonerName + " has not played the minimum of " + statistics.minimumGames +
                " ranked games yet";

        if (summoner.summonerLevel !== 30) {
            errorMessage.show(minGamesError);
            return $q.reject('Insufficient summoner level');
        }

        var promise = matchHistoryService.matchHistory(region, summoner.id);
        promise
            .then(function(matchHistory) {
                statistics.rawMatchDetails = matchHistory.raw;
                statistics.matchDetails = matchHistory.filtered;

                if (matchHistory.length < statistics.minimumGames) {
                    errorMessage.show(minGamesError);
                }
            })
            .catch(showDefaultErrorMessage);

        return promise;
    }

    init();

    function init() {
        loader.show();
        
        fillSummonerDetails()
            .then(fillMatchDetails)
            .finally(loader.hide);
    }
}