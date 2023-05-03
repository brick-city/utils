import assert from 'node:assert';
import { describe, it } from 'node:test';

import { zeroPaddedBinary } from './index.js';

describe('zeroPaddedBinary', () => {

    it("7 should return '0b00000111'", () => {

        assert.strictEqual(zeroPaddedBinary(7), '0b00000111');

    });

    it("262 should return '0b0000000100000110'", () => {

        assert.strictEqual(zeroPaddedBinary(262), '0b0000000100000110');

    });

    it('null should throw because it is not of type number', () => {

        assert.throws(() => { zeroPaddedBinary(null); }, (new TypeError('Expecting a number')));

    });

    it('undefined should throw because it is not of type number', () => {

        assert.throws(() => { zeroPaddedBinary(undefined); }, (new TypeError('Expecting a number')));

    });

    it("'5' should throw because it is not of type number (Does not coerce)", () => {

        // @ts-ignore
        assert.throws(() => { zeroPaddedBinary('5'); }, (new TypeError('Expecting a number')));

    });

});
