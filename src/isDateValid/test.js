import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isDateValid } from './index.js';

describe('isDateValid', () => {

    it('null is not a valid Date', () => {

        assert.strictEqual(isDateValid(null), false);

    });

    it('undefined is not a valid Date', () => {

        assert.strictEqual(isDateValid(undefined), false);

    });

    it('{} is not a valid Date', () => {

        assert.strictEqual(isDateValid({}), false);

    });

    it("'Test' is not a valid Date", () => {

        assert.strictEqual(isDateValid('Test'), false);

    });

    it('55 is not a valid Date', () => {

        assert.strictEqual(isDateValid(55), false);

    });

    it('[] is not a valid Date', () => {

        assert.strictEqual(isDateValid([]), false);

    });

    it('()=>{} is not a valid Date', () => {

        assert.strictEqual(isDateValid(() => {}), false);

    });

    it('new Date() is a valid Date', () => {

        assert.strictEqual(isDateValid(new Date()), true);

    });

    it('new Date("2025-01-01") is a valid Date', () => {

        assert.strictEqual(isDateValid(new Date('2025-01-01')), true);

    });

    it('new Date(0) is a valid Date', () => {

        assert.strictEqual(isDateValid(new Date(0)), true);

    });

    it('new Date("invalid") is not a valid Date (Invalid Date object)', () => {

        assert.strictEqual(isDateValid(new Date('invalid')), false);

    });

});
