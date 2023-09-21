# utils

A collection of utilities that are used by brick-city packages.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
npm install --save @brick-city/utils
```


## Usage
- [arrayToString](#arraytostringarrstring) Nicely format an array for display
- [deepfreeze](#deepfreezeobjobjectvoid) Deep freeze an object and avoid buffers
- [isPlainObject](#isplainobjectobjobjectboolean) Check if an object is a plain object 
- [isPlainObjectEmpty](#isplainobjectemptyobjobjectboolean) Check if an object is a plain object, and is empty
- [isRegex](#isregexobjanyboolean) Check if the passed value is a regular expression  
- [isUndefinedOrNull](#isundefinedornullvalueanyboolean) Check for an undefined or null value
- [mssqlCdcUpdateMaskToBooleanArray]() Converts an mssql change data capture update mask to an array of boolean 
- [mssqlCdcUpdateMaskToBitArray]() Converts an mssql change data capture update mask to an array of bits
- [zeroPaddedBinary](#zeropaddedbinaryintegernumberstring) Nicely format a number as a binary

### `arrayToString(arr:*[]):string`

arrayToString displays an array as you would expect it to look in code. If the element is undefined, only a comma is returned, if it is a string its wrapped in quotes. Simply calls .toString on each element

Throws a type error if passed something other than an array.

```javascript
import { arrayToString } from '@brick-city/util';

arrayToString([]) // []
arrayToString([,]) // [ ,]
arrayToString([,,]) // [ , ,]
arrayToString([5,,5]) // [ 5, , 5]
arrayToString([1, 'abc', 5]) // [ 1, 'abc', 5]

```

### `deepFreeze(obj:Object):Object`

deepFreeze takes an object and recursively walks down the object's own properties and deepFreeze(s) any plain objects it finds, and then freezes the object. Buffers and other non-plain objects are skipped. This was a drawback of other "deepFreeze" type functions which are tripped up by Buffers. Returns a reference to the originally passed object.

```javascript
import { deepFreeze } from '@brick-city/util';

deepFreeze(object)

```

### `isPlainObject(obj:any):boolean`

isPlainObject returns a boolean that indicates if the object is a plain object.

```javascript
import { isPlainObject } from '@brick-city/util';

isPlainObject({}) // true
isPlainObject({a:0}) // true
isPlainObject(null) // false
isPlainObject(()=>{}) // false
isPlainObject(7) // false
isPlainObject( new Object() ); //true
isPlainObject( Object.create(null) ); //true

```

### `isPlainObjectEmpty(obj:any):boolean`

isPlainObjectEmpty returns a boolean that indicates if the object is a plain object and it is empty.

```javascript
import { isPlainObjectEmpty } from '@brick-city/util';

isPlainObjectEmpty({}) // true
isPlainObjectEmpty({a:0}) // false
isPlainObjectEmpty(null) // false
isPlainObjectEmpty(()=>{}) // false
isPlainObjectEmpty(7) // false
isPlainObjectEmpty( new Object() ); //true
isPlainObjectEmpty( Object.create(null) ); //true

```

### `isRegex(obj:any):boolean`

isRegex returns a boolean that indicates if the object is a regular expression.

```javascript
import { isRegex } from '@brick-city/util';

isRegex( new RegExp('') ); //true
isRegex( new RegExp('ab+c') ); //true
isRegex( new RegExp(/.+/ ) ); //true
isRegex({}) // false
isRegex({a:0}) // false
isRegex(null) // false
isRegex(()=>{}) // false
isRegex(7) // false
isRegex( new Object() ); //false
isRegex( Object.create(null) ); //false

```

### `isUndefinedOrNull(value:any):boolean`

isUndefinedOrNull returns a boolean that indicates if the value passed is either undefined or null.

```javascript
import { isPlainObjectEmpty } from '@brick-city/util';

isUndefinedOrNull({}) // false
isUndefinedOrNull({a:0}) // false
isUndefinedOrNull(null) // true
isUndefinedOrNull(undefined) // true
isUndefinedOrNull(()=>{}) // false
isUndefinedOrNull(7) // false

```

### `mssqlCdcUpdateMaskToBooleanArray(updateMask:Buffer):Array<boolean>`

mssqlCdcUpdateMaskToBooleanArray takes a mssql change data capture update mask, and returns a boolean array which signifies which column ordinal bits are set.  The first column ordinal in mssql change data capture is 1, so the zeroth array element is empty.

```javascript
import { mssqlCdcUpdateMaskToBooleanArray:updateMaskToBoolean } from '@brick-city/util';

updateMaskToBoolean(Buffer.from([0b00000010]); // [, false, true, false, false, false, false, false, false]
updateMaskToBoolean(Buffer.from([0b01000000]); // [, false, false, false, false, false, false, true, false]
updateMaskToBoolean(Buffer.from([0b00000001, 0b11111111]); // [, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false ]
updateMaskToBoolean(Buffer.from([0b00000101, 0b00000001, 0b11111111]); // [,
//                                                                          true, true, true, true, true, true, true, true,
//                                                                          true, false, false, false, false, false, false, false,
//                                                                          true, false, true, false, false, false, false, false,
//                                                                      ]
// Notice the bytes are reversed, the last bytes bits appear first
```


### `mssqlCdcUpdateMaskToBooleanArray(updateMask:Buffer):Array<boolean>`

mssqlCdcUpdateMaskToBitArray takes a mssql change data capture update mask, and returns a bit array which signifies which column ordinal bits are set.  The first column ordinal in mssql change data capture is 1, so the zeroth array element is empty.

```javascript
import { mssqlCdcUpdateMaskTobitArray:updateMaskToBit } from '@brick-city/util';

updateMaskToBit(Buffer.from([0b00000010]); // [, 0, 1, 0, 0, 0, 0, 0, 0]
updateMaskToBit(Buffer.from([0b01000000]); // [, 0, 0, 0, 0, 0, 0, 1, 0]
updateMaskToBit(Buffer.from([0b00000001, 0b11111111]); // [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
updateMaskToBit(Buffer.from([0b00000101, 0b00000001, 0b11111111]); // [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]
// Notice the bytes are reversed, the last bytes bits appear first
```

### `zeroPaddedBinary(integer:number):string`

zeroPaddedBinary returns the integer as a binary string padded with zeros to a length of multiples of 8, and prefixed with '0b'. Throws with a TypeError if the value passed is not a number. The value is rounded down to an integer if it is a float.

```javascript
import { zeroPaddedBinary } from '@brick-city/util';

zeroPaddedBinary({}) // throws new TypeError('Expecting a number')
zeroPaddedBinary({a:0})  // throws new TypeError('Expecting a number')
zeroPaddedBinary(null)  // throws new TypeError('Expecting a number')
zeroPaddedBinary(undefined)  // throws new TypeError('Expecting a number')
zeroPaddedBinary(262) // '0b0000000100000110'
zeroPaddedBinary(7) // '0b00000111'

```
## Support

Please [open an issue](https://github.com/brick-city/utils/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/brick-city/utils/compare/).

## License
MIT License