describe('MatchesFilterService', function () {
    var matchesFilterService,
        testMatches = [
            {
                "winner": true,
                "matchDuration": 2100,
                "stats": {
                    "minionKills": 38,
                    "kills": 1,
                    "deaths": 5,
                    "assists": 18
                },
                "matchVersion": "6.2.0.240",
                "summonerId": 41798732,
                "role": "DUO_SUPPORT",
                "teams": {
                    "blue": {
                        "players": [
                            {
                                "summonerId": 23079190,
                                "summonerName": "TestQuest"
                            },
                            {
                                "summonerId": 41798732,
                                "summonerName": "Minikoen"
                            },
                            {
                                "summonerId": 50977616,
                                "summonerName": "WhoNizzle"
                            },
                            {
                                "summonerId": 38574301,
                                "summonerName": "Marinosa"
                            },
                            {
                                "summonerId": 44309523,
                                "summonerName": "B0ER"
                            }
                        ]
                    },
                    "red": {
                        "players": [
                            {
                                "summonerId": 20880220,
                                "summonerName": "Phillius"
                            },
                            {
                                "summonerId": 78558878,
                                "summonerName": "Sir Bobbington"
                            },
                            {
                                "summonerId": 22188481,
                                "summonerName": "madroff"
                            },
                            {
                                "summonerId": 36278117,
                                "summonerName": "MulleMeckination"
                            },
                            {
                                "summonerId": 71471130,
                                "summonerName": "KrevetkoBlya"
                            }
                        ]
                    }
                },
                "lane": "BOTTOM",
                "championId": 79,
                "matchCreation": 1455825035864,
                "queueType": "TEAM_BUILDER_DRAFT_RANKED_5x5",
                "matchId": 2526191029
            },
            {
                "winner": true,
                "matchDuration": 1722,
                "stats": {
                    "minionKills": 32,
                    "kills": 3,
                    "deaths": 1,
                    "assists": 10
                },
                "matchVersion": "6.3.0.240",
                "summonerId": 41798732,
                "role": "DUO_SUPPORT",
                "teams": {
                    "blue": {
                        "players": [
                            {
                                "summonerId": 23235827,
                                "summonerName": "Millionz"
                            },
                            {
                                "summonerId": 61107583,
                                "summonerName": "Cata g0d"
                            },
                            {
                                "summonerId": 60902146,
                                "summonerName": "BomberTre"
                            },
                            {
                                "summonerId": 43876102,
                                "summonerName": "Sudalaminkia"
                            },
                            {
                                "summonerId": 46653844,
                                "summonerName": "MAWLIDie"
                            }
                        ]
                    },
                    "red": {
                        "players": [
                            {
                                "summonerId": 75469144,
                                "summonerName": "whose your dady"
                            },
                            {
                                "summonerId": 41798732,
                                "summonerName": "Minikoen"
                            },
                            {
                                "summonerId": 44309523,
                                "summonerName": "B0ER"
                            },
                            {
                                "summonerId": 38574301,
                                "summonerName": "Marinosa"
                            },
                            {
                                "summonerId": 50977616,
                                "summonerName": "WhoNizzle"
                            }
                        ]
                    }
                },
                "lane": "BOTTOM",
                "championId": 412,
                "matchCreation": 1455827713529,
                "queueType": "TEAM_BUILDER_DRAFT_RANKED_5x5",
                "matchId": 2526198681
            },
            {
                "winner": false,
                "matchDuration": 2286,
                "stats": {
                    "minionKills": 46,
                    "kills": 3,
                    "deaths": 4,
                    "assists": 17
                },
                "matchVersion": "6.3.0.240",
                "summonerId": 41798732,
                "role": "DUO_SUPPORT",
                "teams": {
                    "blue": {
                        "players": [
                            {
                                "summonerId": 50977616,
                                "summonerName": "WhoNizzle"
                            },
                            {
                                "summonerId": 44309523,
                                "summonerName": "B0ER"
                            },
                            {
                                "summonerId": 38574301,
                                "summonerName": "Marinosa"
                            },
                            {
                                "summonerId": 41798732,
                                "summonerName": "Minikoen"
                            },
                            {
                                "summonerId": 302529,
                                "summonerName": "Facilmente"
                            }
                        ]
                    },
                    "red": {
                        "players": [
                            {
                                "summonerId": 46819038,
                                "summonerName": "Sir arlock"
                            },
                            {
                                "summonerId": 44051435,
                                "summonerName": "Xx Le b\u00c3\u00b3 Jeu xX"
                            },
                            {
                                "summonerId": 44097151,
                                "summonerName": "maitre shadock"
                            },
                            {
                                "summonerId": 45950381,
                                "summonerName": "Sexy Chicken"
                            },
                            {
                                "summonerId": 37967394,
                                "summonerName": "iLoveYourMuMMy"
                            }
                        ]
                    }
                },
                "lane": "BOTTOM",
                "championId": 412,
                "matchCreation": 1456342740254,
                "queueType": "TEAM_BUILDER_DRAFT_RANKED_5x5",
                "matchId": 2534230374
            }
        ],
        championInfoService = {
            championByName: jasmine.createSpy("championByNameSpy")
        },
        stateParams = {};


    beforeEach(module('analyzedggApp.service'));
    beforeEach(module(function ($provide) {
        stateParams.min = undefined;
        stateParams.max = undefined;
        stateParams.champion = undefined;
        stateParams.patch = undefined;
        stateParams.win = undefined;

        $provide.value('ChampionInfoService', championInfoService);
        $provide.value('$stateParams', stateParams);
    }));
    beforeEach(inject(function (_MatchesFilterService_) {
        matchesFilterService = _MatchesFilterService_;
    }));

    //Must
    describe('the filter functions', function () {
        it('should filter out no matches when no stateParams are set', function () {
            var filteredMatches = matchesFilterService.filter(testMatches);

            expect(filteredMatches).toEqual(testMatches);
        });

        it('should filter the matchDetails based on the min parameter', function() {
            stateParams.min = 2;

            var filteredMatches = matchesFilterService.filter(testMatches);

            expect(filteredMatches.length).toBe(2);
            expect(filteredMatches).toEqual(testMatches.slice(1));
        });

        it('should filter the matchDetails based on the max parameter', function() {
            stateParams.max = 2;

            var filteredMatches = matchesFilterService.filter(testMatches);

            expect(filteredMatches.length).toBe(2);
            expect(filteredMatches).toEqual(testMatches.slice(0, 2));
        });

        it('should filter the matchDetails based on the min and max parameter', function() {
            stateParams.min = 2;
            stateParams.max = 2;

            var filteredMatches = matchesFilterService.filter(testMatches);

            expect(filteredMatches.length).toBe(1);
            expect(filteredMatches).toEqual(testMatches.slice(1, 2));
        });

        it('should filter the matchDetails based on the champion name', function() {
            stateParams.champion = "Gragas";
            championInfoService.championByName.and.returnValue({id: 79});

            var filteredMatches = matchesFilterService.filter(testMatches);

            expect(filteredMatches.length).toBe(1);
            expect(filteredMatches[0]).toEqual(testMatches[0]);
            expect(championInfoService.championByName).toHaveBeenCalledWith(stateParams.champion);
        });

        it('should filter out no matches when the champion name is invalid', function() {
            stateParams.champion = "Gragas";
            championInfoService.championByName.and.returnValue({id: 0}); // In the case of 'Helmet bro'

            var filteredMatches = matchesFilterService.filter(testMatches);

            expect(filteredMatches.length).toBe(3);
        });

        it('should filter the matchDetails which start with match', function() {
            stateParams.patch = "6.2";

            var filteredMatches = matchesFilterService.filter(testMatches);

            expect(filteredMatches.length).toBe(1);
            expect(filteredMatches[0]).toEqual(testMatches[0]);
        });

        it('should filter the matchDetails based on won matches', function() {
            stateParams.win = "true";

            var filteredMatches = matchesFilterService.filter(testMatches);

            expect(filteredMatches.length).toBe(2);
            expect(filteredMatches).toEqual(testMatches.slice(0, 2));
        });

        it('should filter the matchDetails based on lost matches', function() {
            stateParams.win = "false";

            var filteredMatches = matchesFilterService.filter(testMatches);

            expect(filteredMatches.length).toBe(1);
            expect(filteredMatches).toEqual([testMatches[2]]);
        });
    });
});