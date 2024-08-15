/* eslint-disable no-sparse-arrays */
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { asciiCaseInsensitiveRegex } from './index.js';

describe('asciiCaseInsensitiveRegex', () => {

    it(' \'Hello*World\' regex should be /[Hh][Ee][Ll][Ll][Oo]\\*[Ww][Oo][Rr][Ll][Dd]/ ', () => {

        // @ts-ignore
        assert.deepStrictEqual(asciiCaseInsensitiveRegex('Hello*World'), /[Hh][Ee][Ll][Ll][Oo]\*[Ww][Oo][Rr][Ll][Dd]/);

    });

    it('null should throw because it is not of type string', () => {

        assert.throws(() => { asciiCaseInsensitiveRegex(null); }, (new TypeError('Expecting a string')));

    });

    it('undefined should throw because it is not of type string', () => {

        assert.throws(() => { asciiCaseInsensitiveRegex(undefined); }, (new TypeError('Expecting a string')));

    });

    it('45 should throw because it is not of type string', () => {

        assert.throws(() => { asciiCaseInsensitiveRegex(45); }, (new TypeError('Expecting a string')));

    });

});
