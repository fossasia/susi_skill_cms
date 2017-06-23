var test = require('tape').test;
var arrayTreeFilter = require('..');

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

test('basic use', function(t) {
  var result = arrayTreeFilter(data, function(item, level) {
    return item.value === values[level];
  });
  t.equal(result.length, 3);
  t.equal(result[0].value, 'a');
  t.equal(result[1].value, 'b');
  t.equal(result[2].value, 'c');
  t.end();
});

var data2 = [{
  value: 'a',
  childNodes: [{
    value: 'b',
    childNodes: [{
      value: 'c'
    }, {
      value: 'd'
    }]
  }]
}];

test('childrenKeyName', function(t) {
  var result = arrayTreeFilter(data2, function(item, level) {
    return item.value === values[level];
  }, {
    childrenKeyName: 'childNodes'
  });
  t.equal(result.length, 3);
  t.equal(result[0].value, 'a');
  t.equal(result[1].value, 'b');
  t.equal(result[2].value, 'c');
  t.end();
});
