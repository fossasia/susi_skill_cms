# rc-cascader

---

React Cascader Component

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-cascader.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-cascader
[travis-image]: https://img.shields.io/travis/react-component/cascader.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/cascader
[coveralls-image]: https://img.shields.io/coveralls/react-component/cascader.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/cascader?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/cascader.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/cascader
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-cascader.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-cascader

## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 8+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |

## Screenshots

<img src="https://os.alipayobjects.com/rmsportal/TYFXEbuQXIaMqQF.png" width="288"/>

## Example

http://react-component.github.io/cascader/


## Install

[![rc-cascader](https://nodei.co/npm/rc-cascader.png)](https://npmjs.org/package/rc-cascader)

```bash
$ npm install rc-cascader --save
```

## Usage

```js
import React from 'react';
import Cascader from 'rc-cascader';

const options = [{
  'label': '福建',
  'value': 'fj',
  'children': [{
    'label': '福州',
    'value': 'fuzhou',
    'children': [{
      'label': '马尾',
      'value': 'mawei',
    }],
  }, {
    'label': '泉州',
    'value': 'quanzhou',
  }],
}, {
  'label': '浙江',
  'value': 'zj',
  'children': [{
    'label': '杭州',
    'value': 'hangzhou',
    'children': [{
      'label': '余杭',
      'value': 'yuhang',
    }],
  }],
}, {
  'label': '北京',
  'value': 'bj',
  'children': [{
    'label': '朝阳区',
    'value': 'chaoyang',
  }, {
    'label': '海淀区',
    'value': 'haidian',
  }],
}];

React.render(
  <Cascader options={options}>
    ...
  </Cascader>
, container);
```

## API

### props

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
      <td>options</td>
      <td>Object</td>
      <td></td>
      <td>The data options of cascade</td>
    </tr>
    <tr>
      <td>value</td>
      <td>Array</td>
      <td></td>
      <td>selected value</td>
    </tr>
    <tr>
      <td>defaultValue</td>
      <td>Array</td>
      <td></td>
      <td>initial selected value</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>Function(value, selectedOptions)</td>
      <td></td>
      <td>callback when finishing cascader select</td>
    </tr>
    <tr>
      <td>changeOnSelect</td>
      <td>Boolean</td>
      <td>false</td>
      <td>change value on each selection</td>
    </tr>
    <tr>
      <td>loadData</td>
      <td>Function(selectedOptions)</td>
      <td></td>
      <td>callback when click any option, use for loading more options</td>
    </tr>
    <tr>
      <td>expandTrigger</td>
      <td>String</td>
      <td>'click'</td>
      <td>expand current item when click or hover</td>
    </tr>
    <tr>
      <td>popupVisible</td>
      <td>Boolean</td>
      <td></td>
      <td>visibility of popup overlay</td>
    </tr>
    <tr>
      <td>onPopupVisibleChange</td>
      <td>Function(visible)</td>
      <td></td>
      <td>callback when popup overlay's visibility changed</td>
    </tr>
    <tr>
      <td>transitionName</td>
      <td>String</td>
      <td></td>
      <td>transition className like "slide-up"</td>
    </tr>
    <tr>
      <td>prefixCls</td>
      <td>String</td>
      <td>rc-cascader</td>
      <td>prefix className of popup overlay</td>
    </tr>
    <tr>
      <td>popupClassName</td>
      <td>String</td>
      <td></td>
      <td>additional className of popup overlay</td>
    </tr>
    <tr>
      <td>popupPlacement</td>
      <td>String</td>
      <td>bottomLeft</td>
      <td>use preset popup align config from builtinPlacements：bottomRight topRight bottomLeft topLeft</td>
    </tr>
    <tr>
      <td>getPopupContainer</td>
      <td>function(trigger:Node):Node</td>
      <td>() => document.body</td>
      <td>container which popup select menu rendered into</td>
    </tr>
    <tr>
      <td>dropdownMenuColumnStyle</td>
      <td>Object</td>
      <td></td>
      <td>style object for each cascader pop menu</td>
    </tr>
  </tbody>
</table>

### option

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
      <td>label</td>
      <td>String</td>
      <td></td>
      <td>option text to display</td>
    </tr>
    <tr>
      <td>value</td>
      <td>String</td>
      <td></td>
      <td>option value as react key</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>Boolean</td>
      <td></td>
      <td>disabled option</td>
    </tr>
    <tr>
      <td>children</td>
      <td>Array</td>
      <td></td>
      <td>children options</td>
    </tr>
  </tbody>
</table>

## Development

```bash
$ npm install
$ npm start
```

## Test Case

```bash
$ npm test
```

## Coverage

```bash
$ npm run coverage
```

## License

rc-cascader is released under the MIT license.
