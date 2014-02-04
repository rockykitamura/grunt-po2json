/*
 * grunt-po2json
 * https://github.com/rkitamura/grunt-po2json
 *
 * Copyright (c) 2013 Rocky Kitamura
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    po2json: {
      default_options: {
        src: ['test/**/*.po'],
        dest: 'tmp/dest/default_options/'
      },
      include_fuzzy: {
        options: { fuzzy: true },
        src: ['test/**/*.po'],
        dest: 'tmp/dest/include_fuzzy/'
      },
      nodeJs: {
        options: { nodeJs: true },
        src: ['test/**/*.po'],
        dest: 'tmp/dest/nodejs/'
      },
      rename_output: {
        options: {
          output_filename: function(file) {
            // only rename en1.po, all other files should use the
            // default behavior.
            if (/en1\.po/.test(file)) {
              return 'the_first_file.json';
            }
          }
        },
        src: ['test/**/*.po'],
        dest: 'tmp/dest/rename_output/'
      },
      transform_output: {
        options: {
          output_transform: function(data) {
            var isArray = function(item) {
              return Object.prototype.toString.call(translation)
                              === "[object Array]";
            }

            var transformed = {};
            for (var msgid in data) {
              var translation = data[msgid];
              if (isArray(translation) && translation.length >= 2) {
                // use the first translation only, no pluralization.
                translation = translation[1];
              }

              transformed[msgid] = translation;
            }

            return transformed;
          }
        },
        src: ['test/**/*.po'],
        dest: 'tmp/dest/transform_output/'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'po2json', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
