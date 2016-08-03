describe('MatchHistoryService', function () {

    var matchHistoryService,
        httpBackend;
    beforeEach(module('leagueApp.service.MatchHistoryService'));
    beforeEach(inject(function () {
        // matchHistoryService = _MatchHistoryService_;
        // httpBackend = $httpBackend;

        console.log(matchHistoryService, httpBackend);

    }));

    //Must
    describe('the handling of match history data', function () {
        it('test', function() {
            console.log('gwat');
        });
        // it('should retrieve the right information given an used summoner id', function () {
        //     var testMatches = [{
        //         "queueType": "RANKED_SOLO_5x5",
        //         "matchDuration": 2375,
        //         "stats": {
        //             "minionKills": 4
        //         }
        //     }, {
        //         "queueType": "RANKED_SOLO_5x5",
        //         "matchDuration": 1251,
        //         "stats": {
        //             "minionKills": 3
        //         }
        //     }];
        //
        //     httpBackend.whenGET('api/euw/matchhistory/12345').respond(testMatches);
        //     matchHistoryService.matchHistory('euw', '12345').then(function (data) {
        //         expect(data).toBe(testMatches);
        //     });
        //
        // });
    });
});