# grunt-po2json

> Convert PO files to JSON using Grunt.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-po2json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-po2json');
```

## The "po2json" task

### Overview
In your project's Gruntfile, add a section named `po2json` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  po2json: {
    options: {
        format: 'raw'
    }
    all: {
      src: ['test/**/*.po'],
      dest: 'some/destination/path/'
    }
  },
})
```

### Options

All of the options from [po2json](https://github.com/mikeedwards/po2json)'s `parse` method are exposed through the options object.

#### fuzzy
Type: `Boolean`
Default value: `false`

Whether to include fuzzt translation in JSON or not. Should be either `true` or `false`

#### stringify
Type: `Boolean`
Default value: `false`

If `true`, returns a JSON string. Otherwise returns a plain Javascript object.

#### pretty
Type: `Boolean`
Default value: `false`

If `true`, the resulting JSON string will be pretty-printed. Has no effect when `stringify` is `false`.

#### format
Type: `String`
Default value: `raw`

Either `raw` or `jed`. `raw` produces a "raw" JSON output, while `jed` produces an output that is 100% compatible with [Jed](http://slexaxton.github.io/Jed/).

#### domain
Type: `String`
Default value: `messages`

The domain the messages will be wrapped inside. Only has effect if `format: 'jed'`.

#### nodeJs
Type: `Boolean`
Default value: `false`

Wraps the JSON output in an export definition so it can be imported in Node.js.

#### requireJs
Type: `Boolean`
Default value: `false`

Wraps the JSON output in an AMD definition so it can be imported by Require.js.

#### output_filename
Type: `Function`
Default value: `null`

Customize the output filename. Function is passed the source filename and returns an output filename. If no value is returned, default behavior is used.

```json
  options: {
    output_filename: function(file) {
      // only rename en.po. All other files use default behavior.
      if (/en\.po/.test(file)) {
        return 'english.json';
      }
    }
  }
```
#### output_transform
Type: `Function`
Default value: `null`

Customize the output. Function is passed the data that is normally used as output.

```json
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
  }
```

## Usage

This grunt task runs po2json on every file in `src` and writes the output file to the `dest` path.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
