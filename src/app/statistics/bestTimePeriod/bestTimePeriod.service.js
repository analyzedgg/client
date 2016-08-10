'use strict';

angular.module('leagueApp.statistics.bestTimePeriod')
    .service('BestTimePeriodService', bestTimePeriodService);

bestTimePeriodService.$inject = ['$window'];

function bestTimePeriodService($window) {
    return {
        calculate: function (matchDetails, timezone) {
            var winLossPerPeriod = getWinLossPerPeriod(matchDetails, timezone);

            var bestTimePeriod = {};

            var highestWinRate = 0;
            angular.forEach(winLossPerPeriod, function(periodData, periodName) {
                var totalGames = periodData.wins + periodData.losses;
                var winPercentage = totalGames !== 0 ? periodData.wins / totalGames * 100 : 0;
                var lossPercentage = totalGames !== 0 ? periodData.losses / totalGames * 100 : 0;

                var period = {
                    name: periodName,
                    amountOfMatches: totalGames,
                    winPercentage: winPercentage,
                    lossPercentage: lossPercentage
                };

                bestTimePeriod[periodName] = period;

                if (winPercentage > highestWinRate) {
                    highestWinRate = winPercentage;
                    bestTimePeriod.bestPeriod = periodName;
                }
            });

            return bestTimePeriod;
        }
    };

    function getWinLossPerPeriod(matchDetails, timezone) {
        var winLossPerPeriod = {
            morning: {
                wins: 0,
                losses: 0
            },
            afternoon: {
                wins: 0,
                losses: 0
            },
            evening: {
                wins: 0,
                losses: 0
            },
            night: {
                wins: 0,
                losses: 0
            }
        };

        timezone = timezone ? timezone : $window.moment.tz.guess();
        angular.forEach(matchDetails, function (match) {
            var matchCreation = parseInt($window.moment.tz(match.matchCreation, timezone).format('H'));
            var period;

            if (matchCreation >= 7 && matchCreation < 12) {
                period = "morning";
            } else if (matchCreation >= 12 && matchCreation < 18) {
                period = "afternoon";
            } else if (matchCreation >= 18 && matchCreation < 24) {
                period = "evening";
            } else {
                period = "night";
            }

            if (match.winner) {
                winLossPerPeriod[period].wins++;
            } else {
                winLossPerPeriod[period].losses++;
            }
        });

        return winLossPerPeriod;
    }
}