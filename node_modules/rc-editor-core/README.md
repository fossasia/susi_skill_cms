# rc-editor-core
---

React EditorCore Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-editor-core)](https://saucelabs.com/u/rc-editor-core)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-editor-core.svg)](https://saucelabs.com/u/rc-editor-core)

[npm-image]: http://img.shields.io/npm/v/rc-editor-core.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-editor-core
[travis-image]: https://img.shields.io/travis/react-component/editor-core.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/editor-core
[coveralls-image]: https://img.shields.io/coveralls/react-component/editor-core.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/editor-core?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/editor-core.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/editor-core
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-editor-core.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-editor-core


## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 8+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |

## Screenshots

<img src="https://zos.alipayobjects.com/rmsportal/iNbBdYhHdLxfnCT.png" width="288"/>


## Development

```
npm install
npm start
```

## Example

http://localhost:8003/examples/


online example: http://react-component.github.io/editor-core/


## Feature

* support ie8,ie8+,chrome,firefox,safari


## install


[![rc-editor-core](https://nodei.co/npm/rc-editor-core.png)](https://npmjs.org/package/rc-editor-core)


## Usage

```js
var EditorCore = require('rc-editor-core');
var React = require('react');
React.render(<EditorCore />, container);
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
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional css class of root dom node</td>
        </tr>
    </tbody>
</table>


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

rc-editor-core is released under the MIT license.
