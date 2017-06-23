
# anser

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Travis](https://img.shields.io/travis/IonicaBizau/anser.svg)](https://travis-ci.org/IonicaBizau/anser/) [![Version](https://img.shields.io/npm/v/anser.svg)](https://www.npmjs.com/package/anser) [![Downloads](https://img.shields.io/npm/dt/anser.svg)](https://www.npmjs.com/package/anser) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> A low level parser for ANSI sequences.

## :rocket: Features

 - Converts text containing [ANSI color escape codes](http://en.wikipedia.org/wiki/ANSI_escape_code#Colors) into equivalent HTML elements.
 - Allows converting the input into JSON output.
 - HTML escaping
 - Converts links into HTML elements
 - Friendly APIs to use with  virtual dom libraries


## :cloud: Installation

```sh
$ npm i --save anser
```


## :clipboard: Example



```js
const Anser = require("anser");

const txt = "\u001b[38;5;196mHello\u001b[39m \u001b[48;5;226mWorld\u001b[49m";

console.log(Anser.ansiToHtml(txt));
// <span style="color:rgb(255, 0, 0)">Hello</span> <span style="background-color:rgb(255, 255, 0)">World</span>

console.log(Anser.ansiToHtml(txt, { use_classes: true }));
// <span class="ansi-palette-196-fg">Hello</span> <span class="ansi-palette-226-bg">World</span>

console.log(Anser.ansiToJson(txt));
// [ { content: '',
//     fg: null,
//     bg: null,
//     fg_truecolor: null,
//     bg_truecolor: null,
//     clearLine: undefined,
//     decoration: null,
//     was_processed: false,
//     isEmpty: [Function: isEmpty] },
//   { content: 'Hello',
//     fg: '255, 0, 0',
//     bg: null,
//     fg_truecolor: null,
//     bg_truecolor: null,
//     clearLine: false,
//     decoration: null,
//     was_processed: true,
//     isEmpty: [Function: isEmpty] },
//   { content: ' ',
//     fg: null,
//     bg: null,
//     fg_truecolor: null,
//     bg_truecolor: null,
//     clearLine: false,
//     decoration: null,
//     was_processed: false,
//     isEmpty: [Function: isEmpty] },
//   { content: 'World',
//     fg: null,
//     bg: '255, 255, 0',
//     fg_truecolor: null,
//     bg_truecolor: null,
//     clearLine: false,
//     decoration: null,
//     was_processed: true,
//     isEmpty: [Function: isEmpty] },
//   { content: '',
//     fg: null,
//     bg: null,
//     fg_truecolor: null,
//     bg_truecolor: null,
//     clearLine: false,
//     decoration: null,
//     was_processed: false,
//     isEmpty: [Function: isEmpty] } ]
```

## :memo: Documentation


### `Anser.escapeForHtml(txt)`
Escape the input HTML.

This does the minimum escaping of text to make it compliant with HTML.
In particular, the '&','<', and '>' characters are escaped. This should
be run prior to `ansiToHtml`.
#### Params
- **String** `txt`: The input text (containing the ANSI snippets).

#### Return
- **String** The escaped html.

### `Anser.linkify(txt)`
Adds the links in the HTML.

This replaces any links in the text with anchor tags that display the
link. The links should have at least one whitespace character
surrounding it. Also, you should apply this after you have run
`ansiToHtml` on the text.
#### Params
- **String** `txt`: The input text.

#### Return
- **String** The HTML containing the <a> tags (unescaped).

### `Anser.ansiToHtml(txt, options)`
This replaces ANSI terminal escape codes with SPAN tags that wrap the
content.

This function only interprets ANSI SGR (Select Graphic Rendition) codes
that can be represented in HTML.
For example, cursor movement codes are ignored and hidden from output.
The default style uses colors that are very close to the prescribed
standard. The standard assumes that the text will have a black
background. These colors are set as inline styles on the SPAN tags.

Another option is to set `use_classes: true` in the options argument.
This will instead set classes on the spans so the colors can be set via
CSS. The class names used are of the format `ansi-*-fg/bg` and
`ansi-bright-*-fg/bg` where `*` is the color name,
i.e black/red/green/yellow/blue/magenta/cyan/white.
#### Params
- **String** `txt`: The input text.
- **Object** `options`: The options passed to the ansiToHTML method.

#### Return
- **String** The HTML output.

### `Anser.ansiToJson(txt, options)`
Converts ANSI input into JSON output.
#### Params
- **String** `txt`: The input text.
- **Object** `options`: The options passed to the ansiToHTML method.

#### Return
- **String** The HTML output.

### `Anser.ansiToText(txt)`
Converts ANSI input into text output.
#### Params
- **String** `txt`: The input text.

#### Return
- **String** The text output.

### `Anser()`
The `Anser` class.

#### Return
- **Anser**

### `setupPalette()`
Sets up the palette.

### `escapeForHtml(txt)`
Escapes the input text.
#### Params
- **String** `txt`: The input text.

#### Return
- **String** The escpaed HTML output.

### `linkify(txt)`
Adds HTML link elements.
#### Params
- **String** `txt`: The input text.

#### Return
- **String** The HTML output containing link elements.

### `ansiToHtml(txt, options)`
Converts ANSI input into HTML output.
#### Params
- **String** `txt`: The input text.
- **Object** `options`: The options passed ot the `process` method.

#### Return
- **String** The HTML output.

### `ansiToJson(txt, options)`
Converts ANSI input into HTML output.
#### Params
- **String** `txt`: The input text.
- **Object** `options`: The options passed ot the `process` method.

#### Return
- **String** The JSON output.

### `ansiToText(txt)`
Converts ANSI input into HTML output.
#### Params
- **String** `txt`: The input text.

#### Return
- **String** The text output.

### `process(txt, options, markup)`
Processes the input.
#### Params
- **String** `txt`: The input text.
- **Object** `options`: An object passed to `processChunk` method, extended with:
 - `json` (Boolean): If `true`, the result will be an object.
 - `use_classes` (Boolean): If `true`, HTML classes will be appended to the HTML output.
- **Boolean** `markup`:

### `processChunkJson(text, options, markup)`
Processes the current chunk into json output.
#### Params
- **String** `text`: The input text.
- **Object** `options`: An object containing the following fields:
 - `json` (Boolean): If `true`, the result will be an object.
 - `use_classes` (Boolean): If `true`, HTML classes will be appended to the HTML output.
- **Boolean** `markup`: If false, the colors will not be parsed.

#### Return
- **Object** The result object:
 - `content` (String): The text.
 - `fg` (String|null): The foreground color.
 - `bg` (String|null): The background color.
 - `fg_truecolor` (String|null): The foreground true color (if 16m color is enabled).
 - `bg_truecolor` (String|null): The background true color (if 16m color is enabled).
 - `clearLine` (Boolean): `true` if a carriageReturn \r was fount at end of line.
 - `was_processed` (Bolean): `true` if the colors were processed, `false` otherwise.
 - `isEmpty` (Function): A function returning `true` if the content is empty, or `false` otherwise.

### `processChunk(text, options, markup)`
Processes the current chunk of text.
#### Params
- **String** `text`: The input text.
- **Object** `options`: An object containing the following fields:
 - `json` (Boolean): If `true`, the result will be an object.
 - `use_classes` (Boolean): If `true`, HTML classes will be appended to the HTML output.
- **Boolean** `markup`: If false, the colors will not be parsed.

#### Return
- **Object|String** The result (object if `json` is wanted back or string otherwise).



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:

## :cake: Thanks
This project is highly based on [`ansi_up`](https://github.com/drudru/ansi_up), by [@drudru](https://github.com/drudru/). Thanks! :cake:

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`ansi-to-json`](https://github.com/IonicaBizau/ansi-to-json#readme)—Convert ANSI strings into JSON output.
 - [`ansi-to-react`](https://github.com/nteract/ansi-to-react#readme) (by Kyle Kelley)—ANSI to React Elements
 - [`ansi-to-react-with-classes`](https://npmjs.com/package/ansi-to-react-with-classes) (by Kyle Kelley)—ANSI to React Elements
 - [`nterm`](https://github.com/dariushuntly/nterm/issues) (by Darius Huntly)—A Node Terminal
 - [`singularityui-tailer`](https://github.com/HubSpot/Singularity#readme) (by Danny Wolf)—A robust log tailer
 - [`timer-react-dev-utils`](https://github.com/facebookincubator/create-react-app#readme)—Webpack utilities used by Create React App
 - [`transformime`](https://github.com/nteract/transformime#readme) (by nteract)—Transforms MIMEtypes to HTML Elements

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2012#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
