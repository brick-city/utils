/* eslint-disable no-sparse-arrays */
import { describe, it } from 'node:test';
import { updateMaskToBooleanArray, updateMaskToBitArray } from './index.js';
import { expecting } from '../expecting/index.js';
import { zeroPaddedBinary } from '../zeroPaddedBinary/index.js';

/** @type {[number[], boolean[]|number[]][]} */
let tests;

/**
 *
 * @param {*[]} arr The array to return as a string
 * @returns {string}
 */

function arrayAsString(arr) {

    let s = '[ ';

    for (let i = 0; i < arr.length; i++) {

        if (typeof arr[i] === 'string' || arr[i] instanceof String) {

            s = `${s}'${arr[i].toString()}'`;

        } else if (arr[i] !== undefined) {

            s += arr[i].toString();

        }

        if (i !== arr.length - 1) {

            s += ', ';

        }

    }

    s += ' ]';

    return s;

}

describe('updateMaskToBooleanArray - individual bits', () => {

    tests = [
        [[0b00000000], [, false, false, false, false, false, false, false, false]],
        [[0b00000001], [, true, false, false, false, false, false, false, false]],
        [[0b00000010], [, false, true, false, false, false, false, false, false]],
        [[0b00000100], [, false, false, true, false, false, false, false, false]],
        [[0b00001000], [, false, false, false, true, false, false, false, false]],
        [[0b00010000], [, false, false, false, false, true, false, false, false]],
        [[0b00100000], [, false, false, false, false, false, true, false, false]],
        [[0b01000000], [, false, false, false, false, false, false, true, false]],
        [[0b10000000], [, false, false, false, false, false, false, false, true]],
    ];

    tests.forEach((t) => {

        it(`${zeroPaddedBinary(t[0][0])} should resolve to ${arrayAsString(t[1])}`, expecting(updateMaskToBooleanArray, t[1], Buffer.from(t[0])));

    });

});

describe('updateMaskToBooleanArray multiple bits', () => {

    tests = [
        [[0b11111111], [, true, true, true, true, true, true, true, true]],
        [[0b11111101], [, true, false, true, true, true, true, true, true]],
        [[0b11111011], [, true, true, false, true, true, true, true, true]],
        [[0b11110111], [, true, true, true, false, true, true, true, true]],
        [[0b11101111], [, true, true, true, true, false, true, true, true]],
        [[0b11011111], [, true, true, true, true, true, false, true, true]],
        [[0b10111111], [, true, true, true, true, true, true, false, true]],
        [[0b01111111], [, true, true, true, true, true, true, true, false]],
    ];

    tests.forEach((t) => {

        it(`${zeroPaddedBinary(t[0][0])} should resolve to ${arrayAsString(t[1])}`, expecting(updateMaskToBooleanArray, t[1], Buffer.from(t[0])));

    });

});

describe('updateMaskToBooleanArray multiple bytes', () => {

    tests = [
        [[0b00000001, 0b11111111], [, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false]],
        [[0b00000101, 0b00000001, 0b11111111], [,
            true, true, true, true, true, true, true, true,
            true, false, false, false, false, false, false, false,
            true, false, true, false, false, false, false, false,
        ]],
    ];

    tests.forEach((t) => {

        it(
            `${t[0].reduce((i, v) => `${i + zeroPaddedBinary(v)} `, '')} should resolve to ${arrayAsString(t[1])}`,
            expecting(updateMaskToBooleanArray, t[1], Buffer.from(t[0])),
        );

    });

});

describe('updateMaskToBitArray - individual bits', () => {

    tests = [
        [[0b00000000], [, 0, 0, 0, 0, 0, 0, 0, 0]],
        [[0b00000001], [, 1, 0, 0, 0, 0, 0, 0, 0]],
        [[0b00000010], [, 0, 1, 0, 0, 0, 0, 0, 0]],
        [[0b00000100], [, 0, 0, 1, 0, 0, 0, 0, 0]],
        [[0b00001000], [, 0, 0, 0, 1, 0, 0, 0, 0]],
        [[0b00010000], [, 0, 0, 0, 0, 1, 0, 0, 0]],
        [[0b00100000], [, 0, 0, 0, 0, 0, 1, 0, 0]],
        [[0b01000000], [, 0, 0, 0, 0, 0, 0, 1, 0]],
        [[0b10000000], [, 0, 0, 0, 0, 0, 0, 0, 1]],

    ];

    tests.forEach((t) => {

        it(
            `${t[0].reduce((i, v) => `${i + zeroPaddedBinary(v)} `, '')} should resolve to ${arrayAsString(t[1])}`,
            expecting(updateMaskToBitArray, t[1], Buffer.from(t[0])),
        );

    });

});

describe('updateMaskToBitArray multiple bits', () => {

    tests = [
        [[0b11111111], [, 1, 1, 1, 1, 1, 1, 1, 1]],
        [[0b11111101], [, 1, 0, 1, 1, 1, 1, 1, 1]],
        [[0b11111011], [, 1, 1, 0, 1, 1, 1, 1, 1]],
        [[0b11110111], [, 1, 1, 1, 0, 1, 1, 1, 1]],
        [[0b11101111], [, 1, 1, 1, 1, 0, 1, 1, 1]],
        [[0b11011111], [, 1, 1, 1, 1, 1, 0, 1, 1]],
        [[0b10111111], [, 1, 1, 1, 1, 1, 1, 0, 1]],
        [[0b01111111], [, 1, 1, 1, 1, 1, 1, 1, 0]],
    ];

    tests.forEach((t) => {

        it(`${zeroPaddedBinary(t[0][0])} should resolve to ${arrayAsString(t[1])}`, expecting(updateMaskToBitArray, t[1], Buffer.from(t[0])));

    });

});

describe('updateMaskToBitArray multiple bytes', () => {

    tests = [
        [[0b00000001, 0b11111111], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]],
        [[0b00000101, 0b00000001, 0b11111111], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]],
    ];

    tests.forEach((t) => {

        it(
            `${t[0].reduce((i, v) => `${i + zeroPaddedBinary(v)} `, '')} should resolve to ${arrayAsString(t[1])}`,
            expecting(updateMaskToBitArray, t[1], Buffer.from(t[0])),
        );

    });

});
