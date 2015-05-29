module.exports = function (config) {
    config.set({

        basePath: '../',

        frameworks: ['jasmine'],

        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
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

        exclude: [
            'app/**/*Spec.js'
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

        browsers: ['Chrome'],

        captureTimeout: 60000,

        singleRun: false

    });
};
