describe('DataFormatService', function () {
    var dataFormatService;

    beforeEach(module('leagueApp.service'));
    beforeEach(inject(function (_DataFormatService_) {
        dataFormatService = _DataFormatService_;
    }));

    //Must
    describe('the simplifyLane method', function () {
        it('should leave top, mid and jungle untouched', function () {
            expect(dataFormatService.simplifyLane("MIDDLE", "SOLO")).toEqual("Middle");
            expect(dataFormatService.simplifyLane("TOP", "SOLO")).toEqual("Top");
            expect(dataFormatService.simplifyLane("JUNGLE", "SOLO")).toEqual("Jungle");
        });

        it('should separate the bottom lane by role for ad carry', function() {
            var lane = "BOTTOM",
                role = "DUO_CARRY",
                expected = "AD Carry",
                actual = dataFormatService.simplifyLane(lane, role);

            expect(actual).toEqual(expected);
        });

        it('should separate the bottom lane by role for ad carry', function() {
            var lane = "BOTTOM",
                role = "DUO_SUPPORT",
                expected = "Support",
                actual = dataFormatService.simplifyLane(lane, role);

            expect(actual).toEqual(expected);
        });
    });
});