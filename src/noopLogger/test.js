/* eslint-disable no-sparse-arrays */
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { noopLogger } from './index.js';

describe('noopLogger', () => {

    it('should have same methods as a pino instance', () => {

        assert(Object.hasOwn(noopLogger, 'child'), new Error('child method is not defined'));
        assert(Object.hasOwn(noopLogger, 'fatal'), new Error('fatal method is not defined'));
        assert(Object.hasOwn(noopLogger, 'error'), new Error('error method is not defined'));
        assert(Object.hasOwn(noopLogger, 'warn'), new Error('warn method is not defined'));
        assert(Object.hasOwn(noopLogger, 'info'), new Error('info method is not defined'));
        assert(Object.hasOwn(noopLogger, 'debug'), new Error('debug method is not defined'));
        assert(Object.hasOwn(noopLogger, 'trace'), new Error('trace method is not defined'));
        assert(Object.hasOwn(noopLogger, 'level'), new Error('level property is not defined'));
        assert(Object.hasOwn(noopLogger, 'isLevelEnabled'), new Error('isLevelEnabled method is not defined'));

        assert.equal(typeof noopLogger.child, 'function', new Error('Child method is not a function'));
        assert.equal(typeof noopLogger.fatal, 'function', new TypeError('fatal method is not a function'));
        assert.equal(typeof noopLogger.error, 'function', new TypeError('error method is not a function'));
        assert.equal(typeof noopLogger.warn, 'function', new TypeError('warn method is not a function'));
        assert.equal(typeof noopLogger.info, 'function', new TypeError('info method is not a function'));
        assert.equal(typeof noopLogger.debug, 'function', new TypeError('debug method is not a function'));
        assert.equal(typeof noopLogger.trace, 'function', new TypeError('trace method is not a function'));
        assert.equal(noopLogger.level, Infinity, new RangeError('level property !== Infinity'));

        assert.equal(noopLogger.child(), noopLogger, new Error('child method is not the same as the parent'));

    });

});
