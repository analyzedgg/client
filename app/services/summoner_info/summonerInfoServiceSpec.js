describe('SummonerInfoService', function () {

    var summonerInfoService;
    beforeEach(module('leagueApp'));
    beforeEach(inject(function ($provide) {
        $provide.value('SummonerInfoService', summonerInfoService);
    }));

    //Must
    describe('the handeling of summoner data', function () {
        it('should retrieve the right information given an used username and region', function () {
        });
    });

    it('should log an error when no information is found given the input', function () {
    });
    it('should log the error status of from the response', function () {
    });
});