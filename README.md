<p align=center><a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-dae1e7.svg"></a></p>
<p align=center><img src=./logo_light.svg></p>

<p align=center><b>blotjson</b></p>

<p align=center><i>blotjson</i> is a tool to help you make sense of API responses by displaying JSON in a browser, <br />directly from backend code where the JSON is received</p>

---

## Why *blotjson*?
* There is no need to copy/paste or export your data
* Everything is done locally on your own computer
* An arbitrary number of JSON datum can be easily visualised
## Basic Usage

### Node.js
**Installation**
```
npm i --save-dev blotjson
```
**Example**
```js
const blot = require('blotjson');

blot.visualise(JSON.stringify(
  { 'bar': null, 'baz': 1.0 }
));
```

For further details on how to use blotjson on Node.js, go [here](./src/lang/nodejs/README.md)

## Acknowledgements

The design of displaying the data is in part inspired by [Swagger](https://swagger.io)
