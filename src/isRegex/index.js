/* eslint-disable import/prefer-default-export */

/**
 *
 * Checks to see if the passed object is a Regex
 *
 * @param {Object} obj Object to check
 * @returns {boolean} Returns true if object is a Regex, otherwise false
 *
 */

export function isRegex(obj) {

    return Object.prototype.toString.call(obj) === '[object RegExp]';

}
