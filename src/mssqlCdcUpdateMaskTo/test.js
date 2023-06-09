/* eslint-disable no-sparse-arrays */
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mssqlCdcUpdateMaskToBooleanArray, mssqlCdcUpdateMaskToBitArray } from './index.js';
import { zeroPaddedBinary } from '../zeroPaddedBinary/index.js';
import { arrayToString } from '../arrayToString/index.js';

describe('updateMaskToBooleanArray', () => {

    it("5 should throw TypeError('Expecting a buffer'), as 5 is not a buffer", () => {

        // @ts-ignore
        assert.throws(() => mssqlCdcUpdateMaskToBooleanArray(5), new TypeError('Expecting a buffer'));

    });

});

describe('updateMaskToBitArray', () => {

    it("5 should throw TypeError('Expecting a buffer'), as 5 is not a buffer", () => {

        // @ts-ignore
        assert.throws(() => mssqlCdcUpdateMaskToBitArray(5), new TypeError('Expecting a buffer'));

    });

});

/** @type {[number[], boolean[]|number[]][]} */
let tests;

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

        it(
            `${t[0].reduce((i, v) => `${i + zeroPaddedBinary(v)} `, '')} should resolve to ${arrayToString(t[1])}`,
            () => { assert.deepStrictEqual(mssqlCdcUpdateMaskToBooleanArray(Buffer.from(t[0])), t[1]); },

        );

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

        it(
            `${t[0].reduce((i, v) => `${i + zeroPaddedBinary(v)} `, '')} should resolve to ${arrayToString(t[1])}`,
            () => { assert.deepStrictEqual(mssqlCdcUpdateMaskToBooleanArray(Buffer.from(t[0])), t[1]); },

        );

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
            `${t[0].reduce((i, v) => `${i + zeroPaddedBinary(v)} `, '')} should resolve to ${arrayToString(t[1])}`,
            () => { assert.deepStrictEqual(mssqlCdcUpdateMaskToBooleanArray(Buffer.from(t[0])), t[1]); },

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
            `${t[0].reduce((i, v) => `${i + zeroPaddedBinary(v)} `, '')} should resolve to ${arrayToString(t[1])}`,
            () => { assert.deepStrictEqual(mssqlCdcUpdateMaskToBitArray(Buffer.from(t[0])), t[1]); },

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

        it(
            `${t[0].reduce((i, v) => `${i + zeroPaddedBinary(v)} `, '')} should resolve to ${arrayToString(t[1])}`,
            () => { assert.deepStrictEqual(mssqlCdcUpdateMaskToBitArray(Buffer.from(t[0])), t[1]); },

        );

    });

});

describe('updateMaskToBitArray multiple bytes', () => {

    tests = [
        [[0b00000001, 0b11111111], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]],
        [[0b00000101, 0b00000001, 0b11111111], [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]],
    ];

    tests.forEach((t) => {

        it(
            `${t[0].reduce((i, v) => `${i + zeroPaddedBinary(v)} `, '')} should resolve to ${arrayToString(t[1])}`,
            () => { assert.deepStrictEqual(mssqlCdcUpdateMaskToBitArray(Buffer.from(t[0])), t[1]); },

        );

    });

});
