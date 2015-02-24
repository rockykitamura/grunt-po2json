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
      es6: false,
      requireJs: false,
      singleFile: false,
      stringOnly: false
    });

    var path = require('path');
    var po2json = require('po2json');

    // callback function to transform output filename
    var fileNameTransForm = this.data.fileName || function(fileName) { return fileName};

    this.files.forEach(function(line) {
      var dest, extension, out = {};
      line.src.forEach(function(file) {
        var content = po2json.parseFileSync(file, options);
        var filename = fileNameTransForm(path.basename(file, (path.extname(file))));
        if (!options.singleFile)
        {
          extension = (options.nodeJs || options.requireJs || options.es6 ? 'js' : 'json');
          dest = path.join(line.dest, filename + '.' + extension);
          writeObj(content, dest, options);
        }
        else
          out[filename] = content;
      });

      if (options.singleFile)
      {
        if (!path.extname(line.dest))
        {
          extension = (options.nodeJs || options.requireJs || options.es6 ? 'js' : 'json');
          dest = line.dest + '.' + extension;
        }
        else
          dest = line.dest;
        writeObj(out, dest, options);
      }
    });

  });

  var writeObj = function(data, dest, options) {
    if (options.stringOnly)
      data = nullArrayToString(data);
    var contents = JSON.stringify(data);
    if (options.nodeJs) {
      contents = "module.exports = " + contents + ";";
    } else if (options.requireJs) {
      contents =  "define(function() {\n" +
                  "    return " + contents + ";\n" +
                  "});\n";
    } else if (options.es6) {
        contents = "export default " + contents;
    }
    grunt.file.write(dest, contents);
    grunt.log.writeln('File "' + dest + '" created.');
  };

  var nullArrayToString = function(data) {
    var kindOf = grunt.util.kindOf;
    switch (kindOf(data))
    {
      case "array":
        if (data.length == 2 && !data[0] && kindOf(data[1]) == "string")
          return data[1];
        else
          for (var i= 0, max = data.length; i<max; i++)
            data[i] = nullArrayToString(data[i]);
        break;

      case "object":
        for (var name in data)
          if (data.hasOwnProperty(name))
            data[name] = nullArrayToString(data[name]);
        break;
    }
    return data;
  }

};
