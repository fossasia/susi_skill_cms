# array-tree-filter

filter in array tree.

[![NPM version](https://img.shields.io/npm/v/array-tree-filter.svg?style=flat)](https://npmjs.org/package/array-tree-filter)
[![Build Status](https://img.shields.io/travis/afc163/array-tree-filter.svg?style=flat)](https://travis-ci.org/afc163/array-tree-filter)
[![David Status](https://img.shields.io/david/afc163/array-tree-filter.svg?style=flat)](https://david-dm.org/afc163/array-tree-filter)
[![NPM downloads](http://img.shields.io/npm/dm/array-tree-filter.svg?style=flat)](https://npmjs.org/package/array-tree-filter)

```js
var arrayTreeFilter = require('array-tree-filter');

var data = [{
  value: 'a',
  children: [{
    value: 'b',
    children: [{
      value: 'c'
    }, {
      value: 'd'
    }]
  }]
}];

var values = ['a', 'b', 'c'];

var result = arrayTreeFilter(data, function(item, level) {
  return item.value === values[level];
});

console.log(result);
// [
//   { value: 'a', children: [...] },
//   { value: 'b', children: [...] },
//   { value: 'c', children: [...] }
// ]
```
