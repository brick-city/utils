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
- [acHelper](#acHelper) A little abort controller helper
- [arrayToString](#arraytostringarrstring) Nicely format an array for display
- [deepfreeze](#deepfreezeobjobjectvoid) Deep freeze an object and avoid buffers
- [isPlainObject](#isplainobjectobjobjectboolean) Check if an object is a plain object 
- [isPlainObjectEmpty](#isplainobjectemptyobjobjectboolean) Check if an object is a plain object, and is empty
- [isRegex](#isregexobjanyboolean) Check if the passed value is a regular expression  
- [isUndefinedOrNull](#isundefinedornullvalueanyboolean) Check for an undefined or null value
- [mssqlCdcUpdateMaskToBooleanArray](#mssqlCdcUpdateMaskToBooleanArray) Converts an mssql change data capture update mask to an array of boolean 
- [mssqlCdcUpdateMaskToBitArray]() Converts an mssql change data capture update mask to an array of bits
- [noopLogger](#noopLogger) A pino structured no-op logger
- [traceLogger](#traceLogger) Generates trace messages, and posts them to the provided logger
- [zeroPaddedBinary](#zeropaddedbinaryintegernumberstring) Nicely format a number as a binary

### `acHelper({signal: AbortSignal | AbortSignal[], timeout?: number, abortCallback: EventListener}):AbortController`

acHelper & acHelperNoSignal are abort controller helpers. They simplify some of the repetitive code when consuming AbortSignals and creating AbortControllers.
acHelper requires a signal, acHelperNoSignal does not. Hopefully this code example makes sense

```javascript
import { acHelper } from '@brick-city/utils';

async myAsyncFunction ({signal, options}) 
{
    const controller = acHelper({ signal, timeout:50000, abortCallback: () => {
        console.log('Abort signal received');
        // Additional cleanup or error handling logic here
    }});

    // Any abort signals received from caller on signal will be passed down to 'fetch'
    // myAsyncFunction will also time out after 50000, and the downstream fetch will be aborted

    try {
        const fetchPromise = fetch('https://api.example.com/data', {
            signal: controller.signal,
            ...options
        });

        try {
            await someOtherAsyncThings ();
            const response = await fetchPromise;
        }
        catch (error){
            controller.abort(); // This will abort the fetch
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        controller.abort(); // Abort the request if it hasn't completed yet
    }
}

myAsyncFunction({ signal: new AbortController().signal, options: { method: 'GET' } });
```


### `arrayToString(arr:*[]):string`

arrayToString displays an array as you would expect it to look in code. If the element is undefined, only a comma is returned, if it is a string its wrapped in quotes. Simply calls .toString on each element

Throws a type error if passed something other than an array.

```javascript
import { arrayToString } from '@brick-city/utils';

arrayToString([]) // []
arrayToString([,]) // [ ,]
arrayToString([,,]) // [ , ,]
arrayToString([5,,5]) // [ 5, , 5]
arrayToString([1, 'abc', 5]) // [ 1, 'abc', 5]

```

### `deepFreeze(obj:Object):Object`

deepFreeze takes an object and recursively walks down the object's own properties and deepFreeze(s) any plain objects it finds, and then freezes the object. Buffers and other non-plain objects are skipped. This was a drawback of other "deepFreeze" type functions which are tripped up by Buffers. Returns a reference to the originally passed object.

```javascript
import { deepFreeze } from '@brick-city/utils';

deepFreeze(object)

```

### `isPlainObject(obj:any):boolean`

isPlainObject returns a boolean that indicates if the object is a plain object.

```javascript
import { isPlainObject } from '@brick-city/utils';

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
import { isPlainObjectEmpty } from '@brick-city/utils';

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
import { isRegex } from '@brick-city/utils';

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
import { isPlainObjectEmpty } from '@brick-city/utils';

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


### `mssqlCdcUpdateMaskToBitArray(updateMask:Buffer):Array<boolean>`

mssqlCdcUpdateMaskToBitArray takes a mssql change data capture update mask, and returns a bit array which signifies which column ordinal bits are set.  The first column ordinal in mssql change data capture is 1, so the zeroth array element is empty.

```javascript
import { mssqlCdcUpdateMaskTobitArray:updateMaskToBit } from '@brick-city/utils';

updateMaskToBit(Buffer.from([0b00000010]); // [, 0, 1, 0, 0, 0, 0, 0, 0]
updateMaskToBit(Buffer.from([0b01000000]); // [, 0, 0, 0, 0, 0, 0, 1, 0]
updateMaskToBit(Buffer.from([0b00000001, 0b11111111]); // [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
updateMaskToBit(Buffer.from([0b00000101, 0b00000001, 0b11111111]); // [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]
// Notice the bytes are reversed, the last bytes bits appear first
```

### `noopLogger`

noopLogger is an object with all pino logger logging methods defined, but does nothing.

```javascript
import { noopLogger } from '@brick-city/util';

// Now use it in places where a pino logger is needed, but
// none was passed.

```

### `traceLogger(logger:logger):function`

Pass a pinot styled logger (needs a 'trace' method, and isLevelEnabled method) to this function and it 
will return a function that logs a trace message. If the logger does not have a trace method, or the 
log level is not 'trace', it will return a function that does nothing.

The trace message will include the file name, line number, column number, function name, and method name.

```javascript
import { traceLogger } from '@brick-city/utils';

trace = traceLogger(pinoInstance);

// Now drop these wherever you need to trace the logic

trace()

```

### `zeroPaddedBinary(integer:number):string`

zeroPaddedBinary returns the integer as a binary string padded with zeros to a length of multiples of 8, and prefixed with '0b'. Throws with a TypeError if the value passed is not a number. The value is rounded down to an integer if it is a float.

```javascript
import { zeroPaddedBinary } from '@brick-city/utils';

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