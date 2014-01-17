/*
 * grunt-po2json
 * https://github.com/rkitamura/grunt-po2json
 *
 * Copyright (c) 2013 Rocky Kitamura
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('po2json', 'Convert PO to JSON files', function() {
    var options = this.options({
        fuzzy: false,
        stringify: false,
        pretty: false,
        format: 'raw',
        domain: 'messages',
        nodeJs: false,
        requireJs: false
    });

    var path = require('path');
    var po2json = require('po2json');

    this.files.forEach(function(line) {
      line.src.forEach(function(file) {
        var data = po2json.parseFileSync(file, options);
        var filename = path.basename(file, (path.extname(file)));
        var dest = path.join(line.dest, filename + '.json');

        var contents = JSON.stringify(data);
        if (options.nodeJs) {
            contents = "module.exports = " + contents + ";";
        } else if (options.requireJs) {
            contents = "define(function() {\n" +
                       "    return " + contents + ";\n" +
                       "});\n";
        }

        grunt.file.write(dest, contents);
        grunt.log.writeln('File "' + dest + '" created.');
      });
    });

  });

};
