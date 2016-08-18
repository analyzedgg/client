describe('BestChampService', function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/mocks';

    var bestChampService,
        matchDetails = getJSONFixture('matchDetails/matchDetails.json'),
        champions = getJSONFixture('champions/champions.json')[0], // For some reason (ajax bug?) this has to be an arr.
        championInfoService = {
            championById: function (id) {
                var championKey = Object.keys(champions.data).filter(function(key) {
                    return champions.data[key].id === id;
                });
                return champions.data[championKey];
            }
        };

    beforeEach(module('analyzedggApp.statistics.bestChamp'));
    beforeEach(module(function ($provide) {
        $provide.value('ChampionInfoService', championInfoService);
    }));
    beforeEach(inject(function (_BestChampService_) {
        bestChampService = _BestChampService_;
    }));

    it('should return a list of championData and WinLossData', function(){
        var expectAmountOfChampions = 12;

        var seriesData = bestChampService.getSeriesData(matchDetails);

        var championData = seriesData[0],
            winLossData = seriesData[1];
        expect(championData.length).toBe(expectAmountOfChampions);
        expect(winLossData.length).toBe(expectAmountOfChampions * 2);
    });

    it('should return correctly calculated championData', function(){
        var seriesData = bestChampService.getSeriesData(matchDetails);

        var championData = seriesData[0];
        expect(championData[2]).toEqual({
            name: "Braum",
            y: 9
        });
        expect(championData[6]).toEqual({
            name: "Alistar",
            y: 3
        });
    });

    it('should return correctly calculated winLossData', function(){
        var seriesData = bestChampService.getSeriesData(matchDetails);

        var winLossData = seriesData[1];
        expect(winLossData[4]).toEqual({
            name: 'Wins',
            y: 6,
            color: '#0b0'
        });
        expect(winLossData[5]).toEqual({
            name: 'Losses',
            y: 3 ,
            color: '#b00'
        });
    });
});