'use strict';

angular.module('leagueApp.statistics.bestTeam', ['leagueApp.service'])
    .controller('BestTeamCtrl', bestTeamController);

bestTeamController.$inject = ['$scope', 'BaseChartConfigService'];

function bestTeamController($scope, baseChartConfigService) {
    var bestTeam = this, // jshint ignore:line
        matchDetails = $scope.statistics.matchDetails;

    bestTeam.chartConfig = baseChartConfigService.columnWithWinRateAndKDA('Best team');

    // This function generates the data for showing in the graph.
    function getSeriesData(sortedMatchesByTeam) {
        var initialData = {
            wins: [], losses: [], kda: [], avgKills: [], avgDeaths: [], avgAssists: []
        };
        return sortedMatchesByTeam.reduce(function (seriesPerTeam, teamMatches) {
            var initialSums = {
                wins: 0, kills: 0, deaths: 0, assists: 0
            };
            // Sum up all stats
            var stats = teamMatches.matches.reduce(function (acc, match) {
                acc.wins += (match.winner ? 1 : 0);
                acc.kills += match.stats.kills;
                acc.deaths += match.stats.deaths;
                acc.assists += match.stats.assists;

                return acc;
            }, initialSums);

            var totalMatches = teamMatches.matches.length;

            // Calculate all stats based on the stats just summed up
            seriesPerTeam.wins.push(stats.wins);
            seriesPerTeam.losses.push(totalMatches - stats.wins);
            seriesPerTeam.kda.push((stats.kills + stats.assists) / stats.deaths);
            seriesPerTeam.avgKills.push(stats.kills / totalMatches);
            seriesPerTeam.avgDeaths.push(stats.deaths / totalMatches);
            seriesPerTeam.avgAssists.push(stats.assists / totalMatches);

            return seriesPerTeam;
        }, initialData);
    }

    function getTeam(sortedMatchesByTeam) {
        return sortedMatchesByTeam.map(function (teamMatch) {
            return teamMatch.teamName;
        });
    }

    function determineTeam(match) {
        var isInTeamBlue = match.teams.blue.players.filter(function (player) {
                return player.summonerId === match.summonerId;
            }).length === 1;

        return isInTeamBlue ? 'blue' : 'red';
    }

    function getCombinations(summoners) {
        var teams = [],
            f = function (team, summoners) {
                for (var i = 0; i < summoners.length; i++) {
                    var newTeam = team.concat([summoners[i]]);
                    teams.push(newTeam);
                    f(newTeam, summoners.slice(i + 1));
                }
            };
        f([], summoners);
        return teams;
    }

    function getTeamName(summonerNames) {
        return summonerNames.join(", ");
    }

    /////////

    init();

    function init() {
        // Reduce all matches into a map where the index is the name of the team and the value a list of matches
        var matchesByTeam = matchDetails.reduce(function (matchesByTeam, match) {

            // Determine on what team the player played in (red or blue)
            var team = determineTeam(match);

            // First get all players who are in the same team as player, but are not the player himself
            // Then get all summonerNames
            // Then push all matches into the matchesByTeam map per summonerName
            var summoners = match.teams[team].players.filter(function (player) {
                return player.summonerId !== match.summonerId;
            }).map(function (player) {
                return player.summonerName;
            });

            getCombinations(summoners).forEach(function (team) {
                var teamName = getTeamName(team);

                // Get the index of the entry of this summonerName
                var index = matchesByTeam.map(function (m) {
                    return m.teamName;
                }).indexOf(teamName);

                // Create it if not exist, append if exist
                if (index === -1) {
                    matchesByTeam.push({
                        teamName: teamName,
                        matches: [match]
                    });
                } else {
                    matchesByTeam[index].matches.push(match);
                }
            });

            return matchesByTeam;
        }, []);

        // Sort the map based on most games played and take the last couple
        var sortedMatchesByTeamWithMatch = matchesByTeam.sort(function (a, b) {
            return b.matches.length - a.matches.length;
        }).slice(0, 5);

        var categories = getTeam(sortedMatchesByTeamWithMatch);
        var seriesData = getSeriesData(sortedMatchesByTeamWithMatch);

        bestTeam.chartConfig.xAxis.categories = categories;
        bestTeam.chartConfig.series[0].data = seriesData.wins;
        bestTeam.chartConfig.series[1].data = seriesData.losses;
        bestTeam.chartConfig.series[2].data = seriesData.kda;
        bestTeam.chartConfig.series[3].data = seriesData.avgKills;
        bestTeam.chartConfig.series[4].data = seriesData.avgDeaths;
        bestTeam.chartConfig.series[5].data = seriesData.avgAssists;
    }
}