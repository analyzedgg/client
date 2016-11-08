'use strict';

angular.module('leagueApp.statistics.bestLane')
    .service('BestLaneService', bestLaneService);

bestLaneService.$inject = ["DataFormatService"];

function bestLaneService(dataFormatService) {
    return {
        getSeriesData: function(matchDetails) {
            var winsAndLossesPerLane = {};

            angular.forEach(matchDetails, function (match) {
                var lane = dataFormatService.simplifyLane(match.lane, match.role);

                if (!winsAndLossesPerLane[lane]) {
                    winsAndLossesPerLane[lane] = {
                        wins: 0,
                        losses: 0
                    };
                }

                if (match.winner) {
                    winsAndLossesPerLane[lane].wins++;
                } else {
                    winsAndLossesPerLane[lane].losses++;
                }
            });

            var lanesData = [],
                winsLossesData = [];
            angular.forEach(winsAndLossesPerLane, function (winsAndLosses, lane) {
                lanesData.push({
                    name: lane,
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

            return [lanesData, winsLossesData];
        }
    };
}