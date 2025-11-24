import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isDate } from './index.js';

describe('isDate', () => {

    it('null is not a Date', () => {

        assert.strictEqual(isDate(null), false);

    });

    it('undefined is not a Date', () => {

        assert.strictEqual(isDate(undefined), false);

    });

    it('{} is not a Date', () => {

        assert.strictEqual(isDate({}), false);

    });

    it("'Test' is not a Date", () => {

        assert.strictEqual(isDate('Test'), false);

    });

    it('55 is not a Date', () => {

        assert.strictEqual(isDate(55), false);

    });

    it('[] is not a Date', () => {

        assert.strictEqual(isDate([]), false);

    });

    it('()=>{} is not a Date', () => {

        assert.strictEqual(isDate(() => {}), false);

    });

    it('new Date() is a Date', () => {

        assert.strictEqual(isDate(new Date()), true);

    });

    it('new Date("2025-01-01") is a Date', () => {

        assert.strictEqual(isDate(new Date('2025-01-01')), true);

    });

    it('new Date(0) is a Date', () => {

        assert.strictEqual(isDate(new Date(0)), true);

    });

    it('new Date("invalid") is a Date (Invalid Date object with NaN timestamp)', () => {

        assert.strictEqual(isDate(new Date('invalid')), true);

    });

});
