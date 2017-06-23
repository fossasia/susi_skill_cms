## 0.9.1

* Lower node engine requirement to 4.0.0
* Remove unused packages from example
* :arrow_up: Update dependencies

## 0.9.0

* Remove deprecated eslint-plugin-babel options, and drop the whole plugin now that it&#39;s no longer used.
* Refactor merge behavior
* Add support for staticFileGlobs option and stripPrefix(Multi) by merging them with the webpack values.

## 0.8.0

* Add minify to docs
* update sw-precache version
* Add option to minify ServiceWorker file (#25)

## 0.7.2

* Add warning when using filepath option
* Fix failing tests from pr #38
* pass force option to `del` (#38)

## 0.7.1

* Update webpack peer dependency
* Add error handling for promise
* Hook plugin to &#39;after-emit&#39; to ensure async execution
* Correct typos

## 0.7.0

* Refactor importScripts default behavior
* Fix preserving the [hash], so it will update the new hash when running in watch mode

## 0.6.3

* Use publicPath for importScripts

## 0.6.2

* Array.from returning empty array
* Use async/await for writeServiceWorker test

## 0.6.1

* Update dependencies
* Add unit tests for writeServiceWorker and apply methods
* Remove useless getAssetGlobs function

## 0.6.0

* Add spec tests and basic test [WIP]
* Update dependencies
* Allow to use [hash] on importScripts
* Fix typo
* Add circleci config
* Add node engine

## 0.5.1

* Add webpack 2 beta peer dependency
* Remove some of example

## 0.5.0

* Add test
* Add `staticFileGlobsIgnorePatterns` option

## 0.4.0

* Add link to official register example
* Update dependencies

## 0.3.1

* Update example to use filename and isolate service-worker script
* Fix filename option

## 0.3.0

* Drop support for options.options
* Add trailing / to output.path for stripPrefix

## 0.2.4

* fixed missing dependency
* Update readmes with better examples, explanations and badges
* Fix example link
* Fix example errors

## 0.2.3

* Add example project
* Use compilation assets instead of chunk.files

## 0.2.1

* Add eslint babel
* Update readme with options instructions and example
* Make options object passable as single argument

## 0.2.0

* Add changelog
* Fix package comma
* Add makefile
* Add eslint dependencies
* Fix babel-es2015 reference
* Allow options parameter to override config
* Add babel
* Move source into src dir

## 0.1.0

* Initial release

# Change Log
All enhancements and patches to sw-precache-webpack-plugin will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
