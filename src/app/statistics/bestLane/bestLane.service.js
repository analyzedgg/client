'use strict';

angular.module('leagueApp.statistics.bestLane')
    .service('BestLaneService', bestLaneService);

function bestLaneService() {
    return {
        getSeriesData: function(matchDetails) {
            var winsAndLossesPerLane = {};

            angular.forEach(matchDetails, function (match) {
                var lane = match.lane;
                if (lane === 'BOTTOM') {
                    lane = (match.role === 'DUO_CARRY') ? 'AD CARRY' : 'SUPPORT';
                }

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