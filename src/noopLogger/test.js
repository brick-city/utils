/* eslint-disable no-sparse-arrays */
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { noopLogger } from './index.js';

describe('noopLogger', () => {

    it('should have same methods as fastify', () => {

        assert(Object.hasOwn(noopLogger, 'child'), new Error('child property is not defined'));
        assert(Object.hasOwn(noopLogger, 'fatal'), new Error('fatal property is not defined'));
        assert(Object.hasOwn(noopLogger, 'error'), new Error('error property is not defined'));
        assert(Object.hasOwn(noopLogger, 'warn'), new Error('warn property is not defined'));
        assert(Object.hasOwn(noopLogger, 'info'), new Error('info property is not defined'));
        assert(Object.hasOwn(noopLogger, 'debug'), new Error('debug property is not defined'));
        assert(Object.hasOwn(noopLogger, 'trace'), new Error('trace property is not defined'));

        assert.equal(typeof noopLogger.child, 'function', new Error('Child property is not a function'));
        assert.equal(typeof noopLogger.fatal, 'function', new TypeError('fatal property is not a function'));
        assert.equal(typeof noopLogger.error, 'function', new TypeError('error property is not a function'));
        assert.equal(typeof noopLogger.warn, 'function', new TypeError('warn property is not a function'));
        assert.equal(typeof noopLogger.info, 'function', new TypeError('info property is not a function'));
        assert.equal(typeof noopLogger.debug, 'function', new TypeError('debug property is not a function'));
        assert.equal(typeof noopLogger.trace, 'function', new TypeError('trace property is not a function'));

        assert.equal(noopLogger.child(), noopLogger, new Error('child property is not the same as the parent'));

    });

});
