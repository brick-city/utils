/**
 *
 * Checks to see if the passed value is a javascript Date, otherwise false
 *
 * @param {any} value Object to check
 * @returns {boolean} Returns true if value is a javascript Date, otherwise false
 *
 */

export const isDate = (value) => value instanceof Date;
