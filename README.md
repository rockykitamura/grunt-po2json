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
    all: {
      src: ['test/**/*.po'],
      dest: 'some/destination/path/'
    }
  },
})
```

## Usage

This grunt task runs po2json on every file in `src` and writes the output file to the `dest` path.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
