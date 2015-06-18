module.exports = function (config) {
    config.set({

        basePath: '../',

        frameworks: ['jasmine'],

        files: [
            'app/lib/jquery/dist/jquery.js',
            'app/lib/angular/angular.js',
            'app/lib/angular-route/angular-route.js',
            'app/lib/angular-resource/angular-resource.js',
            'app/lib/angular-mocks/angular-mocks.js',
            'app/lib/bootstrap/dist/js/bootstrap.js',
            'app/**/*.js',
            'app/services/**/*.js',
            'app/summoner_page*/**/*.js'
        ],

        plugins: [
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-ng-html2js-preprocessor'
        ],


        reporters: ['progress', 'junit', 'coverage'],

        preprocessors: {
            'app/**/*.js': 'coverage',
            'app/**/*.html': 'ng-html2js'
        },

        junitReporter: {
            outputFile: 'reports/junit/test-results.xml',
            suite: ''
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/'
        },

        colors: true,

        autoWatch: true,

        browsers: ['PhantomJS'],

        captureTimeout: 60000,

        singleRun: true

    });
};
