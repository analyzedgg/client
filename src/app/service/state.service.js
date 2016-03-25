'use strict';

angular.module('leagueApp.service', ['ngResource'])

    .service('StateService', [function () {
        var state = {};
        return {
            getActiveSummoner: function () {
                return state.activeSummoner;
            },
            setActiveSummoner: function (summoner) {
                state.activeSummoner = summoner;
            },
            getActiveRegion: function () {
                return state.activeRegion;
            },
            setActiveRegion: function (region) {
                state.activeRegion = region;
            },
            getActiveQueueType: function () {
                return state.activeQueueType;
            },
            setActiveQueueType: function (queueType) {
                state.activeQueueType = queueType;
            },
            getActiveChampions: function () {
                return state.activeChampions;
            },
            setActiveChampions: function (champions) {
                state.activeChampions = champions;
            }
        };
    }]);