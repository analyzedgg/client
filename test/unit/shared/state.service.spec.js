describe('StateService', function () {

    var stateService;
    beforeEach(module('leagueApp.service.state'));
    beforeEach(inject(function (_StateService_) {
        stateService = _StateService_;
    }));

    //Must
    describe('the handling of summoner data', function () {
        var baseSummoner = {name: 'minikoen', id: '123'};
        beforeEach(function () {
            stateService.setActiveSummoner(baseSummoner);
        });

        it('should retrieve the active summoner data', function () {
            expect(stateService.getActiveSummoner()).toBe(baseSummoner);
        });

        it('should set the active summoner data', function () {
            var newSummoner = {name: 'wagglez', id: '321'};
            stateService.setActiveSummoner(newSummoner);
            expect(stateService.getActiveSummoner()).toBe(newSummoner);
        });

    });

    describe('the handling of region data', function () {
        var baseRegion = 'euw';
        beforeEach(function () {
            stateService.setActiveRegion(baseRegion);
        });

        it('should retrieve the active region data', function () {
            expect(stateService.getActiveRegion()).toBe(baseRegion);
        });

        it('should set the active region data', function () {
            stateService.setActiveRegion('na');
            expect(stateService.getActiveRegion()).toBe('na');
        })
    });
});