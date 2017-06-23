# rc-dialog
---

react dialog component

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-dialog.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-dialog
[travis-image]: https://img.shields.io/travis/react-component/dialog.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/dialog
[coveralls-image]: https://img.shields.io/coveralls/react-component/dialog.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/dialog?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/dialog.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/dialog
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-dialog.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-dialog

## Screenshot

<img src="http://gtms04.alicdn.com/tps/i4/TB1dp5lHXXXXXbmXpXXyVug.FXX-664-480.png" />

## Install

[![rc-dialog](https://nodei.co/npm/rc-dialog.png)](https://npmjs.org/package/rc-dialog)

## Usage

```js
var Dialog = require('rc-dialog');

ReactDOM.render(
  <Dialog title={title} onClose={callback1} visible>
      <p>first dialog</p>
  </Dialog>
), document.getElementById('t1'));

// use dialog
```

## API

### rc-dialog(web)


<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>prefixCls</td>
          <td>String</td>
          <td>rc-dialog</td>
          <td>The dialog dom node's prefixCls</td>
      </tr>
      <tr>
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional className for dialog</td>
      </tr>
      <tr>
          <td>wrapClassName</td>
          <td>String</td>
          <td></td>
          <td>additional className for dialog wrap</td>
      </tr>
      <tr>
          <td>style</td>
          <td>Object</td>
          <td>{}</td>
          <td>Root style for dialog element.Such as width, height</td>
      </tr>
      <tr>
          <td>zIndex</td>
          <td>Number</td>
          <td></td>
          <td></td>
      </tr>
      <tr>
          <td>bodyStyle</td>
          <td>Object</td>
          <td>{}</td>
          <td>body style for dialog body element.Such as height</td>
      </tr>
      <tr>
          <td>maskStyle</td>
          <td>Object</td>
          <td>{}</td>
          <td>style for mask element.</td>
      </tr>
      <tr>
          <td>visible</td>
          <td>Boolean</td>
          <td>false</td>
          <td>current dialog's visible status</td>
      </tr>
      <tr>
          <td>animation</td>
          <td>String</td>
          <td></td>
          <td>part of dialog animation css class name</td>
      </tr>
      <tr>
          <td>maskAnimation</td>
          <td>String</td>
          <td></td>
          <td>part of dialog's mask animation css class name</td>
      </tr>
      <tr>
          <td>transitionName</td>
          <td>String</td>
          <td></td>
          <td>dialog animation css class name</td>
      </tr>
      <tr>
          <td>maskTransitionName</td>
          <td>String</td>
          <td></td>
          <td>mask animation css class name</td>
      </tr>
      <tr>
          <td>title</td>
          <td>String|React.Element</td>
          <td></td>
          <td>Title of the dialog</td>
      </tr>
      <tr>
          <td>footer</td>
          <td>React.Element</td>
          <td></td>
          <td>footer of the dialog</td>
      </tr>
      <tr>
          <td>closable</td>
          <td>Boolean</td>
          <td>true</td>
          <td>whether show close button</td>
      </tr>
      <tr>
          <td>mask</td>
          <td>Boolean</td>
          <td>true</td>
          <td>whether show mask</td>
      </tr>
      <tr>
          <td>maskClosable</td>
          <td>Boolean</td>
          <td>true</td>
          <td>whether click mask to close</td>
      </tr>
    <tr>
        <td>keyboard</td>
        <td>Boolean</td>
        <td>true</td>
        <td>whether support press esc to close</td>
    </tr>
      <tr>
          <td>mousePosition</td>
          <td>{x:number,y:number}</td>
          <td></td>
          <td>set pageX and pageY of current mouse(it will cause transform origin to be set).</td>
      </tr>
      <tr>
          <td>onClose</td>
          <td>function()</td>
          <td></td>
          <td>called when click close button or mask</td>
      </tr>
      <tr>
          <td>getContainer</td>
          <td>function(): HTMLElement</td>
          <td></td>
          <td>to determine where Dialog will be mounted</td>
      </tr>
    </tbody>
</table>

### rc-dialog/lib/Modal (react-native)

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>wrapStyle</td>
          <td></td>
          <td>{}</td>
          <td>style for modal wrap</td>
      </tr>
      <tr>
          <td>maskStyle</td>
          <td></td>
          <td>{}</td>
          <td>style for modal mask</td>
      </tr>
      <tr>
          <td>style</td>
          <td></td>
          <td>{}</td>
          <td>style for modal</td>
      </tr>
      <tr>
          <td>animationType</td>
          <td>none|fade|slide-up|slide-down</td>
          <td>slide-up</td>
          <td>animation type for modal content</td>
      </tr>
      <tr>
          <td>animationDuration</td>
          <td>number</td>
          <td>300(ms)</td>
          <td></td>
      </tr>
      <tr>
          <td>visible</td>
          <td>boolean</td>
          <td></td>
          <td></td>
      </tr>
      <tr>
          <td>animateAppear</td>
          <td>false</td>
          <td></td>
          <td>whether animation on first show</td>
      </tr>
      <tr>
          <td>onClose</td>
          <td>()=>void</td>
          <td></td>
          <td>called when close</td>
      </tr>
      <tr>
          <td>onAnimationEnd</td>
          <td>(visible:boolean)=>void (animationType !== 'none')</td>
          <td></td>
          <td>called when animation end</td>
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

online example: http://react-component.github.io/dialog/

## react-native

```
./node_modules/rc-tools run react-native-init
react-native run-ios
```

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

rc-dialog is released under the MIT license.
