'use strict';
/*global module:false*/
module.exports = function (grunt) {

    //load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    //Time how long tasks take.
    require('time-grunt')(grunt);

    var portNum = 9005;

    // Project configuration.
    grunt.initConfig({
            //Project settings
            yeoman: {
                src: 'src',
                app: 'src/app',
                test: 'test',
                dist: 'dist'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            //Watches files for changes and runs tasks based on the changed files
            watch: {
                bower: {
                    files: ['bower.json'],
                    tasks: ['bowerInstall']
                },
                js: {
                    files: ['<%= yeoman.app %>/**/*.js'],
                    tasks: ['newer:jshint:all'],
                    options: {
                        livereload: true
                    }
                },
                protractorTest: {
                    files: ['<%= yeoman.test %>/**/*.js'],
                    tasks: ['newer:jshint:test', 'connect:test', 'protractor_webdriver', 'protractor:e2e']
                },
                styles: {
                    files: ['<%= yeoman.app %>/css/**/*.css'],
                    options: {
                        livereload: true
                    }
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: ['<%= yeoman.app %>/**/*.html']
                }
            },
            //The actual grunt serve settings
            connect: {
                options: {
                    port: portNum,
                    // Change this to '0.0.0.0' to caccess the server from the outside
                    hostname: 'localhost',
                    livereload: 9113,
                    base: '<%= yeoman.src %>',
                    keepalive: true
                },

                livereload: {
                    options: {
                        open: 'http://localhost:' + portNum + '/'
                    }
                },
                test: {
                    options: {
                        port: 9000,
                        base: [
                            '.tmp',
                            '<%= yeoman.app %>',
                            '*.html',
                            '' //So test/mocks can be served.
                        ]
                    }
                },
                dist: {
                    options: {
                        base: '<%= yeoman.dist %>'
                    }
                }
            },
            // Make sure code styles are up to par and there are no obvious mistakes
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                all: {
                    reporterOutput: 'reports/jshint/jshint.xml',
                    reporter: 'jshint-junit-reporter',
                    src: ['<%= yeoman.app %>/**/*.js']
                }
            },
            // Empties folders to start fresh
            clean: {
                server: '.tmp',
                dist: 'dist'
            },
            //Automatically inject Bower components into the app
            bowerInstall: {
                app: {
                    src: ['<%= yeoman.app %>/index.html'],
                    ignorePath: '<%= yeoman.app %>/'
                }
            },
            //Protractor test settings
            protractor: {
                options: {
                    keepAlive: false,
                    noColor: false
                },
                e2e: {
                    options: {
                        configFile: '<%= yeoman.test %>/protractor.config.js',
                        args: {
                            baseUrl: 'http://localhost:<%= connect.test.options.port %>/',
                            params: {
                                baseUrl: 'http://localhost:<%= connect.test.options.port %>/'
                            }
                        }
                    }
                }
            },
            protractor_webdrirver: { //jshint ignore:line
                e2e: {
                    options: {
                        command: 'node ./node_modules/protractor/bin/webdriver-manager start'
                    }
                }
            },
            //Unit test settings
            karma: {
                unit: {
                    configFile: '<%= yeoman.test %>/karma.conf.js',
                    singleRun: true
                }
            },
            copy: {
                app: {
                    files: [
                        {expand: true, src: ['<%= yeoman.src %>/*'], dest: '<%= yeoman.dist %>/', filter: 'isFile'},
                        {expand: true, src: ['<%= yeoman.src %>/**'], dest: '<%= yeoman.dist %>/'}
                    ]
                }
            },
            apimocker: {
                options: {
                    configFile: '<%= yeoman.test %>/mocks/apimocker.conf.json'
                }
            },
            ngconstant: {
                // Options for all targets
                options: {
                    space: '  ',
                    wrap: '"use strict";\n\n {%= __ngModule %}',
                    name: 'constants',
                    dest: '<%= yeoman.app %>/constants.js'
                },
                // Environment targets
                test: {
                    constants: {
                        ENV: {
                            BASE_URL: 'http://localhost:7878',
                            MINIMUM_RANKED_GAMES: 1
                        }
                    }
                },
                local: {
                    constants: {
                        ENV: {
                            BASE_URL: 'http://localhost:8080',
                            MINIMUM_RANKED_GAMES: 1
                        }
                    }
                },
                live: {
                    constants: {
                        ENV: {
                            BASE_URL: 'http://40.114.148.250',
                            MINIMUM_RANKED_GAMES: 1
                        }
                    }
                }
            },
            compress: {
                main: {
                    options: {
                        archive: '<%= yeoman.dist %>/client.zip'
                    },
                    files: [
                        {src: ['**/*'], dest: '/', expand: true, cwd: '<%= yeoman.dist %>/src/'}
                    ]
                }
            }
        }
    );

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'bowerInstall',
            'ngconstant:local',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('serveWithMocks', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'bowerInstall',
            'ngconstant:test',
            'apimocker',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'jshint',
        // 'connect:test',
        'ngconstant:test',
        // 'apimocker',
        'karma'/*,
         'protractor_webdriver',
         'protractor:e2e'*/
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'ngconstant:live',
        'copy:app',
        'compress'
    ]);
}
;
