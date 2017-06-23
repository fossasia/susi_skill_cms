# omit.js

Utility function to create a shallow copy of an object which had dropped some fields.

## Usage

```bash
npm i --save omit.js
```

```js
var omit = require('omit.js');
omit({ name: 'Benjy', age: 18 }, [ 'name' ]);
```

## API

### omit(obj: Object, fields: string[]): Object

Return a shallow copy which had dropped fields.

## License

MIT
