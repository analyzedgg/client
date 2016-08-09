describe('BestPatchService', function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/mocks';

    var bestPatchService,
        matchDetails = getJSONFixture('matchDetails/matchDetails.json');

    beforeEach(module('leagueApp.statistics.bestPatch'));
    beforeEach(inject(function (_BestPatchService_) {
        bestPatchService = _BestPatchService_;
    }));

    it('should return a list of patches and series with the same length of series', function(){
        var expectAmountOfPatches = 8;

        var seriesData = bestPatchService.getSeriesData(matchDetails);

        expect(seriesData.categories.length).toBe(expectAmountOfPatches);
        ["wins", "losses", "kda", "avgKills", "avgDeaths", "avgAssists"].forEach(function(key) {
            expect(seriesData.seriesData[key].length).toBe(expectAmountOfPatches);
        });
    });

    it('should calculate the categories correctly', function() {
        var expectedPatches = ['Patch 6.3', 'Patch 6.4', 'Patch 6.5', 'Patch 6.6', 'Patch 6.7',
            'Patch 6.8', 'Patch 6.9', 'Patch 6.10'];

        var actualPatches = bestPatchService.getSeriesData(matchDetails).categories;

        expect(actualPatches).toEqual(expectedPatches);
    });

    it('should calculate the seriesData correctly', function() {
        var seriesData = bestPatchService.getSeriesData(matchDetails).seriesData;

        expect(seriesData.wins[5]).toBe(3);
        expect(seriesData.losses[5]).toBe(1);
        expect(seriesData.kda[5]).toBe(3.25);
        expect(seriesData.avgKills[5]).toBe(2.75);
        expect(seriesData.avgDeaths[5]).toBe(4);
        expect(seriesData.avgAssists[5]).toBe(10.25);
    });
});