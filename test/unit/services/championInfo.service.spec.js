describe('ChampionInfoService', function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/mocks/champions/';

    var championInfoService,
        championList = getJSONFixture('champions.json')[0], // For some reason (ajax bug?) this has to be an arr.
        httpBackend,
        ENV,
        mockedStateParams = {
            region: 'euw'
        };

    beforeEach(module('analyzedggApp.service'));
    beforeEach(module(function($provide) {
        $provide.value('$stateParams', mockedStateParams)
    }));
    beforeEach(inject(function (_ChampionInfoService_, $httpBackend, _ENV_) {
        championInfoService = _ChampionInfoService_;
        httpBackend = $httpBackend;
        ENV = _ENV_;
    }));

    //Must
    describe('the handling of champion data', function() {
        it('should retrieve the list of champions by name', function() {
            httpBackend.whenGET(ENV.BASE_URL + '/api/euw/champions').respond(championList);
            httpBackend.flush();

            var champion = championInfoService.championByName('Jayce');

            expect(champion).toEqual({
                name: 'Jayce',
                tags: [ 'Fighter', 'Marksman' ],
                key: 'Jayce',
                id: 126,
                title: 'the Defender of Tomorrow'
            });
        });

        it('should return the default list of champions when the servercall fails', function() {
            httpBackend.whenGET(ENV.BASE_URL + '/api/euw/champions').respond(500, '');
            httpBackend.flush();

            var champion = championInfoService.championByName('Jayce');

            expect(champion).toEqual({
                name: 'Jayce',
                tags: [ 'Fighter', 'Marksman' ],
                key: 'Jayce',
                id: 126,
                title: 'the Defender of Tomorrow'
            });
        });

        it('should not fail when the champion does not exist (e.g. when a new champion has been released)', function() {
            httpBackend.whenGET(ENV.BASE_URL + '/api/euw/champions').respond(500, '');
            httpBackend.flush();

            var champion = championInfoService.championById(100);

            expect(champion).toEqual({
                tags: [],
                id: 0,
                title: 'Helmet bro',
                name: 'Unknown',
                key: 'Unknown'
            });
        });

        it('should not fail when the champion does not exist (e.g. when a new champion has been released)', function() {
            httpBackend.whenGET(ENV.BASE_URL + '/api/euw/champions').respond(500, '');
            httpBackend.flush();

            var champion = championInfoService.championByName('Ao Shin');

            expect(champion).toEqual({
                tags: [],
                id: 0,
                title: 'Helmet bro',
                name: 'Unknown',
                key: 'Unknown'
            });
        });
    });
});