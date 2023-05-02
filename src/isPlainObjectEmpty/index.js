/* eslint-disable import/prefer-default-export */

import { isPlainObject } from '../isPlainObject/index.js';

/**
 *
 * Returns true if object is a plain object and it is empty, false otherwise
 *
 * @param {any} obj The object to check
 * @returns {boolean} True if object is a plain object and it is empty, false otherwise
 *
 *  ```javascript
 *
 *  import { isPlainObjectEmpty } from '@brick-city/utility';
 *
 *  isPlainObjectEmpty( {} ); // true
 *  isPlainObjectEmpty( { aa:  3 } ); //false
 *  isPlainObjectEmpty( [] ); // false
 *
 * ```
 *
 */

export function isPlainObjectEmpty(obj) {

    return isPlainObject(obj) && !Object.values(obj).length;

}
