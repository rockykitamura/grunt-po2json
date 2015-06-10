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
        requireJs: false,
        output_filename: null,
        output_transform: null
    });

    var path = require('path');
    var po2json = require('po2json');

    function getFilename(file) {
      // if output_filename returns a value, use the returned value
      // as the full filename. Otherwise, keep the same filename and change
      // the extension from .po to .js or .json.
      var filename = options.output_filename && options.output_filename(file);
      if (! filename) {
        filename = path.basename(file, (path.extname(file)));
        filename += (options.nodeJs || options.requireJs ? '.js' : '.json');
      }

      return filename;
    }

    function getContents(data) {
      if (typeof options.output_transform === 'function') {
        data = options.output_transform(data);
      }

      var contents = JSON.stringify(data);
      if (options.nodeJs) {
          contents = "module.exports = " + contents + ";";
      } else if (options.requireJs) {
          contents = "define(function() {\n" +
                     "    return " + contents + ";\n" +
                     "});\n";
      }

      return contents;
    }

    this.files.forEach(function(line) {
      line.src.forEach(function(file) {
        var data = po2json.parseFileSync(file, options);
        var contents = getContents(data);

        var dest = path.join(line.dest, getFilename(file));
        grunt.file.write(dest, contents);
        grunt.verbose.writeln('File "' + dest + '" created.');
      });
    });

  });

};
