describe('BestTeamService', function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/mocks';

    var bestTeamService,
        matchDetails = getJSONFixture('matchDetails/matchDetails.json');

    beforeEach(module('leagueApp.statistics.bestTeam'));
    beforeEach(inject(function (_BestTeamService_) {
        bestTeamService = _BestTeamService_;
    }));

    it('should return a list of teams and series with the same length of series', function(){
        var expectAmountOfTeams = 5;

        var seriesData = bestTeamService.getSeriesData(matchDetails);

        expect(seriesData.categories.length).toBe(expectAmountOfTeams);
        ["wins", "losses", "kda", "avgKills", "avgDeaths", "avgAssists"].forEach(function(key) {
            expect(seriesData.seriesData[key].length).toBe(expectAmountOfTeams);
        });
    });

    it('should calculate the categories correctly', function() {
        var expectedTeams = ['Wagglez', 'Marinosa', 'WhoNizzle', 'Wagglez, Marinosa', 'B0ER'];

        var actualTeams = bestTeamService.getSeriesData(matchDetails).categories;

        expect(actualTeams).toEqual(expectedTeams);
    });

    it('should calculate the seriesData correctly', function() {
        var seriesData = bestTeamService.getSeriesData(matchDetails).seriesData;

        expect(seriesData.wins[3]).toBe(14);
        expect(seriesData.losses[3]).toBe(8);
        expect(seriesData.kda[3]).toBeCloseTo(2.9411764705882355);
        expect(seriesData.avgKills[3]).toBe(2.772727272727273);
        expect(seriesData.avgDeaths[3]).toBe(5.409090909090909);
        expect(seriesData.avgAssists[3]).toBe(13.136363636363637);
    });
});