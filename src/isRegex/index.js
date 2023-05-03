/* eslint-disable import/prefer-default-export */

/**
 *
 * Checks to see if the passed object is a regular expression
 *
 * @param {any} value Object to check
 * @returns {boolean} Returns true if object is a Regex, otherwise false
 *
 */

export const isRegex = (value) => Object.prototype.toString.call(value) === '[object RegExp]';
