describe('BestTimePeriodService', function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/mocks';

    var bestTimePeriodService,
        matchDetails = getJSONFixture('matchDetails/matchDetails.json');

    beforeEach(module('analyzedggApp.statistics.bestTimePeriod'));
    beforeEach(inject(function (_BestTimePeriodService_) {
        bestTimePeriodService = _BestTimePeriodService_;
    }));

    it('should return the morning period information', function(){
        var morningPeriod = bestTimePeriodService.calculate(matchDetails, "Europe/Amsterdam").morning;

        expect(morningPeriod.name).toBe("morning");
        expect(morningPeriod.amountOfMatches).toBe(1);
        expect(morningPeriod.winPercentage).toBe(0);
        expect(morningPeriod.lossPercentage).toBe(100);
    });

    it('should return the afternoon period information', function(){
        var afternoonPeriod = bestTimePeriodService.calculate(matchDetails, "Europe/Amsterdam").afternoon;

        expect(afternoonPeriod.name).toBe("afternoon");
        expect(afternoonPeriod.amountOfMatches).toBe(8);
        expect(afternoonPeriod.winPercentage).toBe(37.5);
        expect(afternoonPeriod.lossPercentage).toBe(62.5);
    });

    it('should return the evening period information', function(){
        var eveningPeriod = bestTimePeriodService.calculate(matchDetails, "Europe/Amsterdam").evening;

        expect(eveningPeriod.name).toBe("evening");
        expect(eveningPeriod.amountOfMatches).toBe(41);
        expect(eveningPeriod.winPercentage).toBeCloseTo(63, 0);
        expect(eveningPeriod.lossPercentage).toBeCloseTo(37, 0);
    });

    it('should return the night period information', function(){
        var nightPeriod = bestTimePeriodService.calculate(matchDetails, "Europe/Amsterdam").night;

        expect(nightPeriod.name).toBe("night");
        expect(nightPeriod.amountOfMatches).toBe(0);
        expect(nightPeriod.winPercentage).toBe(0);
        expect(nightPeriod.lossPercentage).toBe(0);
    });

    it('should return the highest period', function(){
        var bestPeriod = bestTimePeriodService.calculate(matchDetails, "Europe/Amsterdam").bestPeriod;
        expect(bestPeriod).toBe("evening");
    });

});