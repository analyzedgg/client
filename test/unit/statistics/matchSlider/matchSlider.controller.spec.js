describe('MatchSliderCtrl', function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/mocks';

    var $controller,
        matchDetails = getJSONFixture('matchDetails/matchDetails.json'),
        stubbedMomentFormat = jasmine.createSpy('momentFormatSpy').and.returnValue('FormattedDate'),
        mockedScope = {
            statistics: {
                rawMatchDetails: matchDetails
            }
        },
        mockedState = {
            go: jasmine.createSpy('$state.go spy')
        },
        mockedStateParams = {},
        mockedENV = {
            MINIMUM_RANKED_GAMES: 1
        },
        mockedWindow = {
            moment: jasmine.createSpy('$window.moment spy').and.callFake(function() {
                return {
                    format: stubbedMomentFormat
                };
            })
        },
        mockedDependencies = {};

    beforeEach(module('leagueApp.statistics.matchSlider'));
    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;

        mockedDependencies = {
            $scope: mockedScope,
            $state: mockedState,
            $stateParams: mockedStateParams,
            ENV: mockedENV,
            $window: mockedWindow
        };
    }));

    it('should take 1 and the max length as default stateParams', function() {
        var controller = $controller('MatchSliderCtrl', mockedDependencies);

        expect(controller.min).toBe(1);
        expect(controller.max).toBe(matchDetails.length);
    });

    it('should take the min and max from the stateParams', function() {
        mockedDependencies.$stateParams = {
            min: 5, max: 10
        };

        var controller = $controller('MatchSliderCtrl', mockedDependencies);

        expect(controller.min).toBe(mockedDependencies.$stateParams.min);
        expect(controller.max).toBe(mockedDependencies.$stateParams.max);
    });

    it('should handle invalid stateParams', function() {
        mockedDependencies.$stateParams = {
            min: -10,
            max: matchDetails.length + 10
        };

        var controller = $controller('MatchSliderCtrl', mockedDependencies);

        expect(controller.min).toBe(1);
        expect(controller.max).toBe(matchDetails.length);
    });

    it('should change the state when slider has changed', function() {
        var controller = $controller('MatchSliderCtrl', mockedDependencies);

        controller.options.onEnd('mockedId', 5, 10);

        expect(mockedDependencies.$state.go).toHaveBeenCalledWith('.', {
            min: 5, max: 10
        });
    });

    it('should reset the state of the min and max for invalid values', function() {
        var controller = $controller('MatchSliderCtrl', mockedDependencies);

        controller.options.onEnd('mockedId', 0, 60);

        expect(mockedDependencies.$state.go).toHaveBeenCalledWith('.', {
            min: null, max: null
        });
    });

    it('should set the minRange to the minimum ranked games', function() {
        mockedDependencies.ENV = {
            MINIMUM_RANKED_GAMES: 5
        };

        var controller = $controller('MatchSliderCtrl', mockedDependencies);

        expect(controller.options.minRange).toBe(5);
    });

    it('should correctly translate the dates to something meaningful', function() {
        var matchNumber = 10;

        var controller = $controller('MatchSliderCtrl', mockedDependencies);

        var translatedValue = controller.options.translate(matchNumber);

        expect(mockedWindow.moment).toHaveBeenCalledWith(matchDetails[matchNumber - 1].matchCreation);
        expect(stubbedMomentFormat).toHaveBeenCalledWith('MMM Do YYYY');
        expect(translatedValue).toBe('FormattedDate (#10)');
    })
});