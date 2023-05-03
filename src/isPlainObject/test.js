import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isPlainObject } from './index.js';

describe('isPlainObject', () => {

    it('null is not a plain object', () => {

        assert.strictEqual(isPlainObject(null), false);

    });

    it('undefined is not a plain object', () => {

        assert.strictEqual(isPlainObject(undefined), false);

    });

    it('{} is a plain object', () => {

        assert.strictEqual(isPlainObject({}), true);

    });

    it("{test: 'a'} is a plain object", () => {

        assert.strictEqual(isPlainObject({ test: 'a' }), true);

    });

    it('[] is not a plain object', () => {

        assert.strictEqual(isPlainObject([]), false);

    });

    it('[1,2] is not a plain object', () => {

        assert.strictEqual(isPlainObject([1, 2]), false);

    });

    it('()=>{} is not a plain object', () => {

        assert.strictEqual(isPlainObject(() => {}), false);

    });

    it('55 is not a plain object', () => {

        assert.strictEqual(isPlainObject(55), false);

    });

    it("'Test' is not a plain object", () => {

        assert.strictEqual(isPlainObject('Test'), false);

    });

    it('new Object() is a plain object', () => {

        // eslint-disable-next-line no-new-object
        assert.strictEqual(isPlainObject(new Object()), true);

    });

    it('Object.create(null) is a plain object', () => {

        // eslint-disable-next-line no-new-object
        assert.strictEqual(isPlainObject(Object.create(null)), true);

    });

});
