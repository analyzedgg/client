'use strict';

(function() {
    angular
        .module('analyzedggApp.analytics', [
        ])
        .run(function ($rootScope, $window, $location, $log) {
            $rootScope.$watch(function() {
                return $location.url();
            }, function(newUrl) {
                var pageView = {
                    'event':'virtualPageView',
                    'virtualPageViewURL':newUrl
                };
                $log.log('Pushing new virtualPageView', pageView);
                $window.dataLayer.push(pageView);
            });
        });
})();