'use strict';

angular.module('leagueApp.service')
    .service('DataFormatService', DataFormatService);

function DataFormatService() {
    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    return {
        simplifyLane: function (lane, role) {
            if (lane === 'BOTTOM') {
                return (role === 'DUO_CARRY') ? 'AD Carry' : 'Support';
            } else {
                return capitalize(lane);
            }
        }
    };
}