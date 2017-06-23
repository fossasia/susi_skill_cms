# Codemirror

The excellent [CodeMirror](https://codemirror.net) editor as a [React.js](http://facebook.github.io/react) component.


## Demo & Examples

Live demo: [JedWatson.github.io/react-codemirror](http://JedWatson.github.io/react-codemirror)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use codemirror is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-codemirror.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-codemirror --save
```


## Usage

Require the CodeMirror component and render it with JSX:

```javascript
var React = require('react');
var CodeMirror = require('react-codemirror');

var App = React.createClass({
	getInitialState: function() {
		return {
			code: "// Code",
		};
	},
	updateCode: function(newCode) {
		this.setState({
			code: newCode,
		});
	},
	render: function() {
		var options = {
			lineNumbers: true,
		};
		return <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
	}
});

React.render(<App />, document.getElementById('app'));
```

### Include the CSS

Ensure that CodeMirror's stylesheet `codemirror.css` is loaded.

If you're using LESS (similar for Sass) you can import the css directly from the codemirror package, as shown in [example.less](example/src/example.less):

```less
@import (inline) "./node_modules/codemirror/lib/codemirror.css";
```

If you're using Webpack with the css loader, you can require the codemirror css in your application instead:

```js
require('codemirror/lib/codemirror.css');
```

Alternatively, you can explicitly link the `codemirror.css` file from the CodeMirror project in your index.html file, e.g `<link href="css/codemirror.css"  rel="stylesheet">`.

### Methods

* `focus` focuses the CodeMirror instance
* `getCodeMirror` returns the CodeMirror instance, available .

You can interact with the CodeMirror instance using a `ref` and the `getCodeMirror()` method after the `componentDidMount` lifecycle event has fired (including inside the `componentDidMount` event in a parent Component).

### Properties

* `autoFocus` `Boolean` automatically focuses the editor when it is mounted (default false)
* `autoSave` `Boolean` automatically persist changes to underlying textarea (default false)
* `className` `String` adds a custom css class to the editor
* `codeMirrorInstance` `Function` provides a specific CodeMirror instance (defaults to `require('codemirror')`)
* `defaultValue` `String` provides a default (not change tracked) value to the editor
* `name` `String` sets the name of the editor input field
* `options` `Object` options passed to the CodeMirror instance
* `onChange` `Function (newValue)` called when a change is made
* `onCursorActivity` `Function (codemirror)` called when the cursor is moved
* `onFocusChange` `Function (focused)` called when the editor is focused or loses focus
* `onScroll` `Function (scrollInfo)` called when the editor is scrolled
* `preserveScrollPosition` `Boolean=false` preserve previous scroll position after updating value
* `value` `String` the editor value

See the [CodeMirror API Docs](https://codemirror.net/doc/manual.html#api) for the available options.

### Using Language Modes

Several [language modes](https://codemirror.net/mode/) are included with CodeMirror for syntax highlighting.

By default (to optimise bundle size) all modes are not included. To enable syntax highlighting:

* install the `codemirror` package dependency (in addition to `react-codemirror`)
* require the language modes you wish to make available _after_ you require `react-codemirror` itself
* set the `mode` option in the `options` object

```js
var React = require('react');
var CodeMirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

<CodeMirror ... options={{
	mode: 'javascript',
}} />
```

See the [example source](https://github.com/JedWatson/react-codemirror/blob/master/example/src/example.js) for a reference implementation including JavaScript and markdown syntax highlighting.

### License

Copyright (c) 2016 Jed Watson. [MIT](LICENSE) Licensed.
