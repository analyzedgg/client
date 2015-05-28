'use strict';

angular.module('leagueApp.service.state', ['ngResource'])

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
            }
        }
    }]);