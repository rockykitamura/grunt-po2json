'use strict';

var grunt = require('grunt');

exports.po2json = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  skipFuzzy: function (test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/dest/default_options/en1.json');
    var expected = grunt.file.read('test/expected/default_options/en1.json').trim();
    test.equal(actual, expected, 'should skip fuzzy entries by default');
    test.done();
  },
  simple: function (test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/dest/default_options/en2.json');
    var expected = grunt.file.read('test/expected/default_options/en2.json').trim();
    test.equal(actual, expected, 'should handle simple .po file');
    test.done();
  },
  includeFuzzy: function (test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/dest/include_fuzzy/en1.json');
    var expected = grunt.file.read('test/expected/include_fuzzy/en1.json').trim();
    test.equal(actual, expected, 'include fuzzy entries when requested');
    test.done();
  },
  nodeJs: function (test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/dest/nodejs/en2.js');
    var expected = grunt.file.read('test/expected/nodejs/en2.js').trim();
    test.equal(actual, expected, 'JSON should be wrapped in Node.js export');
    test.done();
  },
  rename_output: function (test) {
    test.expect(2);
    var actual = grunt.file.read('tmp/dest/rename_output/en2.json');
    var expected = grunt.file.read('test/expected/default_options/en2.json').trim();
    test.equal(actual, expected, 'default behavior is to keep the same filename');

    actual = grunt.file.read('tmp/dest/rename_output/the_first_file.json');
    expected = grunt.file.read('test/expected/default_options/en1.json').trim();
    test.equal(actual, expected, 'file renamed');

    test.done();
  },
  transform_output: function (test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/dest/transform_output/en2.json').trim();
    var expected = grunt.file.read('test/expected/transform_output/en2.json').trim();
    test.equal(actual, expected, 'output transformed before write');

    test.done();
  }
};
