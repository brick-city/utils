import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isPlainObjectEmpty } from './index.js';

describe('isPlainObjectEmpty', () => {

    it('null is not an empty plain object', () => {

        assert.strictEqual(isPlainObjectEmpty(null), false);

    });

    it('undefined is not an empty plain object', () => {

        assert.strictEqual(isPlainObjectEmpty(undefined), false);

    });

    it('{} is an empty plain object', () => {

        assert.strictEqual(isPlainObjectEmpty({}), true);

    });

    it("{test: 'a'} is not an empty plain object", () => {

        assert.strictEqual(isPlainObjectEmpty({ test: 'a' }), false);

    });

    it('[] is not an empty plain object', () => {

        assert.strictEqual(isPlainObjectEmpty([]), false);

    });

    it('[1,2] is not an empty plain object', () => {

        assert.strictEqual(isPlainObjectEmpty([1, 2]), false);

    });

    it('()=>{} is not an empty plain object', () => {

        assert.strictEqual(isPlainObjectEmpty(() => {}), false);

    });

    it('55 is not an empty plain object', () => {

        assert.strictEqual(isPlainObjectEmpty(55), false);

    });

    it("'Test' is not an empty plain object", () => {

        assert.strictEqual(isPlainObjectEmpty('Test'), false);

    });

});
