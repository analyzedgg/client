describe('SummonerInfoService', function () {

    var summonerInfoService,
        httpBackend;
    beforeEach(module('leagueApp.service.summonerInfo'));
    beforeEach(inject(function (_SummonerInfoService_, $httpBackend) {
        summonerInfoService = _SummonerInfoService_;
        httpBackend = $httpBackend;

    }));

    //Must
    describe('the handling of summoner data', function () {
        // it('should retrieve the right information given an used username and region', function () {
        //     var testSummoner = {
        //         "id": 41798732,
        //         "name": "Minikoen",
        //         "profileIconId": 608,
        //         "summonerLevel": 30,
        //         "revisionDate": 1432585859000
        //     };
        //
        //     httpBackend.whenGET('api/euw/summoner/minikoen').respond(testSummoner);
        //     summonerInfoService.summoner('euw', 'minikoen').then(function (data) {
        //         expect(data).toBe(testSummoner);
        //     });
        //
        // });
    });
});