import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isRegex } from './index.js';

describe('isRegex', () => {

    it('null is not a regular expression', () => {

        assert.strictEqual(isRegex(null), false);

    });

    it('undefined is not a regular expression', () => {

        assert.strictEqual(isRegex(undefined), false);

    });

    it('{} is not a regular expression', () => {

        assert.strictEqual(isRegex({}), false);

    });

    it("'Test' is not a regular expression", () => {

        assert.strictEqual(isRegex('Test'), false);

    });

    it("{test: 'a'} is not an regular expression", () => {

        assert.strictEqual(isRegex({ test: 'a' }), false);

    });

    it('55 is not an regular expression', () => {

        assert.strictEqual(isRegex(55), false);

    });

    it('[] is not a regular expression', () => {

        assert.strictEqual(isRegex([]), false);

    });

    it('[1,2] is not a regular expression', () => {

        assert.strictEqual(isRegex([1, 2]), false);

    });

    it('()=>{} is not a regular expression', () => {

        assert.strictEqual(isRegex(() => {}), false);

    });

    it('/(?:)/ is a regular expression', () => {

        assert.strictEqual(isRegex(/(?:)/), true);

    });

    it('/.+/ is a regular expression', () => {

        assert.strictEqual(isRegex(/.+/), true);

    });

    it('new RegExp("ab+c") is a regular expression', () => {

        // eslint-disable-next-line prefer-regex-literals
        assert.strictEqual(isRegex(new RegExp('ab+c')), true);

    });

    it("new RegExp('') is a regular expression", () => {

        // eslint-disable-next-line prefer-regex-literals
        assert.strictEqual(isRegex(new RegExp('')), true);

    });

});
