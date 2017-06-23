[![Build Status][status-image]][status-url]
[![NPM Version][npm-image]][npm-url]

## Description

If you know you have two arrays or two objects in hand, and you want to know if they are shallowly equal or not, this library is for you.

## Features

* Super light
* No dependencies
* Thoroughly tested

## Installation

```shell
npm install shallow-equal --save
```

## Usage

```js
var shallowEqualArrays = require('shallow-equal/arrays');

shallowEqualArrays([1, 2, 3], [1, 2, 3])     // => true
shallowEqualArrays([{ a: 5 }], [{ a: 5 }])   // => false
```

```js
var shallowEqualObjects = require('shallow-equal/objects');

shallowEqualObjects({ a: 5, b: 'abc' }, { a: 5, b: 'abc' })   // => true
shallowEqualObjects({ a: 5, b: {} }, { a: 5, b: {} })         // => false
```

## License

[MIT](http://moroshko.mit-license.org)

[status-image]: https://img.shields.io/codeship/53d0b900-42a9-0134-35d6-5a9bff506e9c/master.svg
[status-url]: https://codeship.com/projects/168228
[npm-image]: https://img.shields.io/npm/v/shallow-equal.svg
[npm-url]: https://npmjs.org/package/shallow-equal
