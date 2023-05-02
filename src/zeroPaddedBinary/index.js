/* eslint-disable import/prefer-default-export */

/**
 *
 * Returns a number as a formatted binary string padded out with zeros
 * to a length that is multiples of 8
 *
 * @param {number} integer
 * @returns {string}
 *
 */

export function zeroPaddedBinary(integer) {

    if (typeof integer !== 'number') { throw new TypeError('Expecting a number'); }

    const s = Math.floor(integer).toString(2);

    return `0b${'0'.repeat((8 - (s.length % 8)) % 8)}${s}`;

}
