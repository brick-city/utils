/* eslint-disable no-sparse-arrays */
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { arrayToString } from './index.js';

describe('arrayToString', () => {

    it('[] should be []', () => {

        // @ts-ignore
        assert.strictEqual(arrayToString([]), '[]');

    });

    it('[,] should be [,]', () => {

        // @ts-ignore
        assert.strictEqual(arrayToString([,]), '[ ,]');

    });

    it('[,,] should be [,,]', () => {

        // @ts-ignore
        assert.strictEqual(arrayToString([,,]), '[ , ,]');

    });

    it('[,0,0] should be [, 0, 0]', () => {

        // @ts-ignore
        assert.strictEqual(arrayToString([, 0, 0]), '[ , 0, 0]');

    });

    it('[0, ,0] should be [ 0, , 0]', () => {

        // @ts-ignore
        assert.strictEqual(arrayToString([0, , 0]), '[ 0, , 0]');

    });

    it("[0, 'abc', 0] should be [ 0, 'abc', 0]", () => {

        // @ts-ignore
        assert.strictEqual(arrayToString([0, 'abc', 0]), "[ 0, 'abc', 0]");

    });

    it("5 should throw TypeError('Expecting an array'), as 5 is not an array", () => {

        // @ts-ignore
        assert.throws(() => arrayToString(5), new TypeError('Expecting an array'));

    });

});
