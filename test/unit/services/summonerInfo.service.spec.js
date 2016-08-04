describe('SummonerInfoService', function () {

    var summonerInfoService,
        httpBackend,
        ENV,
        testSummoner = {
            "id": 41798732,
            "name": "Minikoen",
            "profileIconId": 608,
            "summonerLevel": 30,
            "revisionDate": 1432585859000
        };

    beforeEach(module('leagueApp.service'));
    beforeEach(inject(function (_SummonerInfoService_, $httpBackend, _ENV_) {
        summonerInfoService = _SummonerInfoService_;
        httpBackend = $httpBackend;
        ENV = _ENV_;
    }));

    //Must
    describe('the handling of summoner data', function() {
        it('should retrieve the right information given an used username and region', function(done) {

            httpBackend.whenGET(ENV.BASE_URL + '/api/euw/summoner/minikoen').respond(testSummoner);

            summonerInfoService.summoner('euw', 'minikoen')
                .then(function (data) {
                    expect(data.id).toBe(testSummoner.id);
                    expect(data.name).toBe(testSummoner.name);
                    expect(data.profileIconId).toBe(testSummoner.profileIconId);
                    expect(data.summonerLevel).toBe(testSummoner.summonerLevel);
                    expect(data.revisionDate).toBe(testSummoner.revisionDate);
                }).catch(function(error) {
                done.fail(error);
            }).finally(done);

            httpBackend.flush();
        });
    });
});