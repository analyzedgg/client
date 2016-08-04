module.exports = function (config) {
    config.set({

        basePath: '../',

        frameworks: ['jasmine'],

        files: [
            'src/lib/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
            'src/lib/jquery/dist/jquery.js',
            'src/lib/angular/angular.js',
            'src/lib/angular-resource/angular-resource.js',
            'src/lib/angular-mocks/angular-mocks.js',
            'src/lib/angular-ui/build/angular-ui.js',
            'src/lib/angular-bootstrap/ui-bootstrap.js',
            'src/lib/bootstrap/dist/js/bootstrap.js',
            'src/lib/angular-ui-router/release/angular-ui-router.js',
            'src/lib/highcharts/highstock.src.js',
            'src/lib/highcharts-ng/dist/highcharts-ng.js',
            'src/app/constants.js',
            'src/app/**/*.module.js',
            'src/app/**/*.js',

            // Test files
            'test/unit/**/*.spec.js'
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
            'src/**/*.js': 'coverage',
            'src/**/*.html': 'ng-html2js'
        },

        junitReporter: {
            outputFile: 'reports/junit/test-results.xml',
            suite: ''
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/'
        },

        colors: true,

        autoWatch: true,

        // browsers: ['PhantomJS'],
        browsers: ['Chrome'],

        captureTimeout: 60000,

        singleRun: true

    });
};
