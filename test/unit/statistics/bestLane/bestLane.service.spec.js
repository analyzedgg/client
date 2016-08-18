describe('BestLaneService', function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/mocks';

    var bestLaneService,
        matchDetails = getJSONFixture('matchDetails/matchDetails.json');

    beforeEach(module('analyzedggApp.statistics.bestLane'));
    beforeEach(inject(function (_BestLaneService_) {
        bestLaneService = _BestLaneService_;
    }));

    it('should return a list of lanesData and WinLossData', function(){
        var expectAmountOfLanes = 2;

        var seriesData = bestLaneService.getSeriesData(matchDetails);

        var lanesData = seriesData[0],
            winLossData = seriesData[1];
        expect(lanesData.length).toBe(expectAmountOfLanes);
        expect(winLossData.length).toBe(expectAmountOfLanes * 2);
    });

    it('should return correctly calculated championData', function(){
        var seriesData = bestLaneService.getSeriesData(matchDetails);

        var lanesData = seriesData[0];
        expect(lanesData[0]).toEqual({
            name: "SUPPORT",
            y: 43
        });
        expect(lanesData[1]).toEqual({
            name: "AD CARRY",
            y: 7
        });
    });

    it('should return correctly calculated winLossData', function(){
        var seriesData = bestLaneService.getSeriesData(matchDetails);

        var winLossData = seriesData[1];
        expect(winLossData[0]).toEqual({
            name: 'Wins',
            y: 24,
            color: '#0b0'
        });
        expect(winLossData[3]).toEqual({
            name: 'Losses',
            y: 2,
            color: '#b00'
        });
    });

    it('should correctly obtain AD CARRY or SUPPORT from the lane and role data', function() {
        var matchDetails = [{
            lane: "BOTTOM",
            role: "DUO_CARRY"
        }, {
            lane: "BOTTOM",
            role: "DUO_SUPPORT"
        }];

        var lanesData = bestLaneService.getSeriesData(matchDetails)[0];

        expect(lanesData[0].name).toBe('AD CARRY');
        expect(lanesData[1].name).toBe('SUPPORT');
    });
});