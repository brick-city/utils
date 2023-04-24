# public-service

A collection of utilities that are used by brick-city packages.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
npm install --save @brick-city/utility
```


## Usage

### General

### `deepFreeze(obj:Object):void`

deepFreeze takes an object and recursively walks down the object's own properties and deepFreeze(s) any objects it finds, and then freezes the object. Buffers are skipped. This was a drawback of other "deepFreeze" type functions which are tripped up by Buffers.

```javascript
import { deepFreeze } from '@brick-city/utility';

deepFreeze(object)

```

### `leMaskToBits(mask:Buffer):boolean[]`

leMaskToBits takes a little endian Buffer, and returns a boolean array which signifies which bits are set on the Buffer. Use when applications use individual bits of a buffer as a flag. (i.e. Change Data Capture in SQL server)

```javascript
import { leMaskToBits } from '@brick-city/utility';

let flags = leMaskToBits(Buffer.from([0b00000010]);
// [, false, true, false, false, false, false, false, false]

let flags = leMaskToBits(Buffer.from([0b01000000]);
// [, false, false, false, false, false, false, true, false]

let flags = leMaskToBits(Buffer.from([0b00000001, 0b11111111]);
//[ , true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false ]


```
## Support

Please [open an issue](https://github.com/brick-city/utility/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/brick-city/utility/compare/).

## License
MIT License