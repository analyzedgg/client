'use strict';

angular.module('leagueApp.statistics.bestChamp')
    .service('BestChampService', bestChampService);

bestChampService.$inject = ['ChampionInfoService'];

function bestChampService(championInfoService) {
    return {
        getSeriesData: function (matchDetails) {
            var winsAndLossesPerChampion = {};

            angular.forEach(matchDetails, function (match) {
                var champName = championInfoService.championById(match.championId).key;

                if (!winsAndLossesPerChampion[champName]) {
                    winsAndLossesPerChampion[champName] = {
                        wins: 0,
                        losses: 0
                    };
                }

                if (match.winner) {
                    winsAndLossesPerChampion[champName].wins++;
                } else {
                    winsAndLossesPerChampion[champName].losses++;
                }
            });

            var champData = [],
                winsLossesData = [];

            angular.forEach(winsAndLossesPerChampion, function (winsAndLosses, champName) {
                champData.push({
                    name: champName,
                    y: winsAndLosses.wins + winsAndLosses.losses
                });

                winsLossesData.push({
                    name: 'Wins',
                    y: winsAndLosses.wins,
                    color: '#0b0'
                });

                winsLossesData.push({
                    name: 'Losses',
                    y: winsAndLosses.losses,
                    color: '#b00'
                });
            });

            return [champData, winsLossesData];
        }
    };
}