import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isUndefinedOrNull } from './index.js';

describe('isUndefinedOrNull', () => {

    it('null is undefined or null', () => {

        assert.strictEqual(isUndefinedOrNull(null), true);

    });

    it('undefined is undefined or null', () => {

        assert.strictEqual(isUndefinedOrNull(undefined), true);

    });

    it('{} is not undefined or null', () => {

        assert.strictEqual(isUndefinedOrNull({}), false);

    });

    it('[] is not undefined or null', () => {

        assert.strictEqual(isUndefinedOrNull([]), false);

    });

});
