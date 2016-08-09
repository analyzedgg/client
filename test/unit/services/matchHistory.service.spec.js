describe('MatchHistoryService', function () {
    var matchHistoryService,
        httpBackend,
        ENV,
        testMatches = [{
            "queueType": "RANKED_SOLO_5x5",
            "matchDuration": 2375,
            "stats": {
                "minionKills": 4
            }
        }, {
            "queueType": "RANKED_SOLO_5x5",
            "matchDuration": 1251,
            "stats": {
                "minionKills": 3
            }
        }],
        testFilteredMatches = [],
        matchesFilterService = {
            filter: jasmine.createSpy("matchesFilterServiceSpy").and.returnValue(testFilteredMatches)
        };


    beforeEach(module('analyzedggApp.service'));
    beforeEach(module(function ($provide) {
        $provide.value('MatchesFilterService', matchesFilterService);
    }));
    beforeEach(inject(function (_MatchHistoryService_, $httpBackend, _ENV_) {
            matchHistoryService = _MatchHistoryService_;
            httpBackend = $httpBackend;
            ENV = _ENV_;
        }
    ));

    //Must
    describe('the handling of match history data', function () {
        it('should retrieve the right information given an used summoner id', function(done) {
            httpBackend.whenGET(ENV.BASE_URL + '/api/euw/matchhistory/12345').respond(testMatches);

            matchHistoryService.matchHistory('euw', '12345')
                .then(function (data) {
                    expect(matchesFilterService.filter).toHaveBeenCalledWith(data.raw);

                    expect(data.raw.length).toBe(testMatches.length);
                    expect(data.raw[0].queueType).toEqual(testMatches[0].queueType);
                    expect(data.raw[1].stats.minionKills).toEqual(testMatches[1].stats.minionKills);
                    expect(data.filtered).toEqual(testFilteredMatches)
                }).catch(function(error) {
                    done.fail(error);
                }).finally(done);

            httpBackend.flush();
        });
    });
});