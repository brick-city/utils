/* eslint-disable import/prefer-default-export */

/**
 *
 * Returns true if object is a plain object, false otherwise
 *
 *  ```javascript
 *
 *  import { isPlainObject } from '@brick-city/utility';
 *
 *  isPlainObject( {} ); //true
 *  isPlainObject( { aa:  3 } ); //true
 *  isPlainObject( new Object() ); //true
 *  isPlainObject( Object.create(null) ); //true
 *  isPlainObject( null ); //false
 *  isPlainObject( [] ); //false
 *
 *
 * ```
 *
 *  @param {any} obj The object to check
 *  @returns {boolean} True if object is a plain object, false otherwise

 *
 */

export const isPlainObject = (obj) => {

    if (!obj || typeof obj !== 'object') return false;

    const proto = Object.getPrototypeOf(obj);

    return !proto || proto.constructor.name === 'Object';

};
