module.exports = function(grunt) {

    // file to watch and scan
    var files = [
        'boilerplate.js',
        'app.js',
        'Gruntfile.js',
        'models/*.js',
        'routes/*.js',
        'tests/*.js',
        'lib/*.js'
    ];

    grunt.initConfig({
        jscs: {
            scan: {
                src: files,
                options: {
                    config: 'config.jscs.json'
                }
            },
            fix: {
                src: files,
                options: {
                    config: 'config.jscs.json',
                    fix: true
                }
            }
        },
        jshint: {
            all: files
        },

        //https://github.com/pghalliday/grunt-mocha-test
        mochaTest: {
            tests: {
                src:['tests/**/*'],
                options: {
                    reporter: 'spec'
                }
            },
            watch: {
                src:['tests/**/*'],
                options: {
                    reporter: 'nyan'
                }
            },
            tap: {
                src:['tests/**/*'],
                options: {
                    reporter: 'tap'
                }
            }
        },

        watch: {
            js: {
                options: {
                    spawn: true,
                    interrupt: true,
                    debounceDelay: 250
                },
                files: files,
                tasks: ['mochaTest:watch']
            }
        }
    });

    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    // register tasks
    grunt.registerTask('default', ['cleanup', 'test']);
    grunt.registerTask('test', ['mochaTest:tap']);
    grunt.registerTask('cleanup', ['jscs:fix', 'jshint']);

};
