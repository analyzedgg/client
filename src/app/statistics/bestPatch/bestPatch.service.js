'use strict';

angular.module('leagueApp.statistics.bestPatch')
    .service('BestPatchService', bestPatchService);

function bestPatchService() {
    return {
        getSeriesData: function(matchDetails) {
            var matchesByPatch = matchDetails.reduce(function(matchesByPatch, match) {
                var patch = match.matchVersion.split(".").slice(0, 2).join(".");

                matchesByPatch[patch] = matchesByPatch[patch] || [];
                matchesByPatch[patch].push(match);

                return matchesByPatch;
            }, {});

            var categories = getPatches(matchesByPatch);
            var seriesData = calculateSeriesData(matchesByPatch);

            return {
                'categories': categories,
                'seriesData': seriesData
            };
        }
    };

    function calculateSeriesData(matchesByPatch) {
        var initialData = {
            wins: [], losses: [], kda: [], avgKills: [], avgDeaths: [], avgAssists: []
        };
        return Object.keys(matchesByPatch).reduce(function (seriesPerPatch, patch) {
            var initialSums = {
                wins: 0, kills: 0, deaths: 0, assists: 0
            };
            var stats = matchesByPatch[patch].reduce(function (acc, match) {
                acc.wins += (match.winner ? 1 : 0);
                acc.kills += match.stats.kills;
                acc.deaths += match.stats.deaths;
                acc.assists += match.stats.assists;

                return acc;
            }, initialSums);

            var totalMatches = matchesByPatch[patch].length;

            seriesPerPatch.wins.push(stats.wins);
            seriesPerPatch.losses.push(totalMatches - stats.wins);
            seriesPerPatch.kda.push((stats.kills + stats.assists) / stats.deaths);
            seriesPerPatch.avgKills.push(stats.kills / totalMatches);
            seriesPerPatch.avgDeaths.push(stats.deaths / totalMatches);
            seriesPerPatch.avgAssists.push(stats.assists / totalMatches);

            return seriesPerPatch;
        }, initialData);
    }

    function getPatches(matchesByPatch) {
        return Object.keys(matchesByPatch).map(function (patch) {
            return 'Patch ' + patch;
        });
    }
}