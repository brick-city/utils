import assert from 'node:assert';
import { describe, it } from 'node:test';
import { deepFreeze } from './index.js';

describe('deepFreeze', () => {

    it('Should Throw, argument 5 not an object', () => {

        // @ts-ignore
        assert.throws(() => { deepFreeze(5); });

    });

    it('Should Throw, argument "string" not an object', () => {

        // @ts-ignore
        assert.throws(() => { deepFreeze('string'); });

    });

    it('Should Freeze the object {}', () => {

        const a = {};

        assert.strictEqual(Object.isFrozen(a), false);

        deepFreeze(a);

        assert.strictEqual(Object.isFrozen(a), true);

    });

    it('Should Freeze the object {a: 0}', () => {

        const a = { a: 0 };

        assert.strictEqual(Object.isFrozen(a), false);

        deepFreeze(a);

        assert.strictEqual(Object.isFrozen(a), true);

    });

    it('Should Deep Freeze the object {a: {}}', () => {

        const a = { a: {} };

        assert.strictEqual(Object.isFrozen(a), false);
        assert.strictEqual(Object.isFrozen(a.a), false);

        deepFreeze(a);

        assert.strictEqual(Object.isFrozen(a), true);
        assert.strictEqual(Object.isFrozen(a.a), true);

    });

    it('Should Deep Freeze the object {a: {a: {}}}', () => {

        const a = { a: { a: {} } };

        assert.strictEqual(Object.isFrozen(a), false);
        assert.strictEqual(Object.isFrozen(a.a), false);
        assert.strictEqual(Object.isFrozen(a.a.a), false);

        deepFreeze(a);

        assert.strictEqual(Object.isFrozen(a), true);
        assert.strictEqual(Object.isFrozen(a.a), true);
        assert.strictEqual(Object.isFrozen(a.a.a), true);

    });

    it('Should Deep Freeze the object {a: {a: {}}, b:Buffer.from([1]) } and not throw.', () => {

        const a = {
            a: { a: {} },
            b: Buffer.from([1]),
        };

        assert.strictEqual(Object.isFrozen(a), false);
        assert.strictEqual(Object.isFrozen(a.a), false);
        assert.strictEqual(Object.isFrozen(a.a.a), false);

        deepFreeze(a);

        assert.strictEqual(Object.isFrozen(a), true);
        assert.strictEqual(Object.isFrozen(a.a), true);
        assert.strictEqual(Object.isFrozen(a.a.a), true);

    });

});
