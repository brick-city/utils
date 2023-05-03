/* eslint-disable import/prefer-default-export */

/**
 * Displays an array as you would expect it to look in code
 *
 * If the element is undefined, only a comma is returned, if it is
 * a string its wrapped in quotes. Simply calls .toString on each elements
 *
 * Throws a type error if passed something other than an array.
 *
 * @param {*[]} arr The array to return as a string
 * @returns {string}
 */

export const arrayToString = (arr) => {

    if (!Array.isArray(arr)) { throw new TypeError('Expecting an array'); }

    let s = '[';

    for (let i = 0; i < arr.length; i++) {

        if (typeof arr[i] === 'string' || arr[i] instanceof String) {

            s += ` '${arr[i].toString()}'`;

        } else if (arr[i] !== undefined) {

            s += ` ${arr[i].toString()}`;

        } else { s += ' '; }

        if ((i < arr.length - 1) || arr[i] === undefined) {

            s += ',';

        }

    }

    s += ']';

    return s;

};
