import assert from 'node:assert';
import { describe, it } from 'node:test';

import { leMaskToBits } from './index.js';

describe('leMaskToBits - individual bits', () => {

    it('0b00000000 should be [ , false, false, false, false, false, false, false, false]', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b00000000])), [, false, false, false, false, false, false, false, false]);

    });

    it('0b00000001 should be [ , true, false, false, false, false, false, false, false ]', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b00000001])), [, true, false, false, false, false, false, false, false]);

    });

    it('0b00000010 should be [empty], false, true, false, false, false, false, false, false', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b00000010])), [, false, true, false, false, false, false, false, false]);

    });

    it('0b00000100 should be [empty], false, false, true, false, false, false, false, false', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b00000100])), [, false, false, true, false, false, false, false, false]);

    });

    it('0b00001000 should be [empty], false, false, false, true, false, false, false, false', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b00001000])), [, false, false, false, true, false, false, false, false]);

    });

    it('0b00010000 should be [empty], false, false, false, false, true, false, false, false', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b00010000])), [, false, false, false, false, true, false, false, false]);

    });

    it('0b00100000 should be [empty], false, false, false, false, false, true, false, false', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b00100000])), [, false, false, false, false, false, true, false, false]);

    });

    it('0b01000000 should be [empty], false, false, false, false, false, false, true, false', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b01000000])), [, false, false, false, false, false, false, true, false]);

    });

    it('0b10000000 should be [empty], false, false, false, false, false, false, false, true', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b10000000])), [, false, false, false, false, false, false, false, true]);

    });

});

describe('leMaskToBits multiple bits', () => {

    it('0b11111111 should be [empty], true, true, true, true, true, true, true, true', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b11111111])), [, true, true, true, true, true, true, true, true]);

    });

    it('0b11111101 should be [empty], true, false, true, true, true, true, true, true', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b11111101])), [, true, false, true, true, true, true, true, true]);

    });

    it('0b11111011 should be [empty], true, true, false, true, true, true, true, true', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b11111011])), [, true, true, false, true, true, true, true, true]);

    });

    it('0b11110111 should be [empty], true, true, true, false, true, true, true, true', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b11110111])), [, true, true, true, false, true, true, true, true]);

    });

    it('0b11101111 should be [empty], true, true, true, true, false, true, true, true', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b11101111])), [, true, true, true, true, false, true, true, true]);

    });

    it('0b11011111 should be [empty], true, true, true, true, true, false, true, true', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b11011111])), [, true, true, true, true, true, false, true, true]);

    });

    it('0b10111111 should be [empty], true, true, true, true, true, true, false, true', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b10111111])), [, true, true, true, true, true, true, false, true]);

    });

    it('0b01111111 should be [empty], true, true, true, true, true, true, true, false', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b01111111])), [, true, true, true, true, true, true, true, false]);

    });

});

describe('leMaskToBits multiple bytes', () => {

    // eslint-disable-next-line max-len
    it('0b00000001, 0b11111111 should be [empty], true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false ', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b00000001, 0b11111111])), [,
            true, true, true, true, true, true, true, true,
            true, false, false, false, false, false, false, false]);

    });

    // eslint-disable-next-line max-len
    it('0b00000101, 0b00000001, 0b11111111 should be [ , true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false ]', () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepStrictEqual(leMaskToBits(Buffer.from([0b00000101, 0b00000001, 0b11111111])), [,
            true, true, true, true, true, true, true, true,
            true, false, false, false, false, false, false, false,
            true, false, true, false, false, false, false, false,
        ]);

    });

});
