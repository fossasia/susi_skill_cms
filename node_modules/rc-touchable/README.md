# rc-touchable
---

react touchable component. inspired by react-native.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-touchable.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-touchable
[travis-image]: https://img.shields.io/travis/react-component/touchable.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/touchable
[coveralls-image]: https://img.shields.io/coveralls/react-component/touchable.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/touchable?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/touchable.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/touchable
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-touchable.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-touchable

## Install

[![rc-touchable](https://nodei.co/npm/rc-touchable.png)](https://npmjs.org/package/rc-touchable)

## Usage

```js
import Touchable from 'rc-touchable';
ReactDOM.render(<Touchable onPress={onPress} activeClassName="active">
<div>click</div>
</Touchable>, container);
```

## API

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>disabled</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
        </tr>
        <tr>
          <td>onPress</td>
          <td>()=>void</td>
          <td></td>
          <td>onPress/onTap callback</td>
        </tr>
        <tr>
          <td>onLongPress</td>
          <td>()=>void</td>
          <td></td>
          <td>onLongPress/onLongTap callback</td>
        </tr>
        <tr>
          <td>activeClassName</td>
          <td>string</td>
          <td></td>
          <td>className applied to child when active</td>
        </tr>
        <tr>
          <td>activeStyle</td>
          <td>object</td>
          <td></td>
          <td>style applied to child when active</td>
        </tr>
    </tbody>
</table>


## Development

```
npm install
npm start
```

## Example

http://localhost:8007/examples/

online example: http://react-component.github.io/touchable/


## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir


## License

rc-touchable is released under the MIT license.
