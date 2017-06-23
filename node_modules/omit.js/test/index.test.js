'use strict';

const assert = require('assert');
const omit = require('../');

describe('omit', function() {
  it('should create a shallow copy', function() {
    const benjy = { name: 'Benjy' };
    const copy = omit(benjy, []);
    assert.deepEqual(copy, benjy);
    assert.notEqual(copy, benjy);
  });

  it('should drop fields which are passed in', function() {
    const benjy = { name: 'Benjy', age: 18 };
    assert.deepEqual(omit(benjy, [ 'age' ]), { name: 'Benjy' });
    assert.deepEqual(omit(benjy, [ 'name', 'age' ]), {});
  });
});
