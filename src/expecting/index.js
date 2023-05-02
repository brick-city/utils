/* eslint-disable import/prefer-default-export */
import assert from 'node:assert';

/**
 *
 * Returns a function that when executed compares the output of the provided function
 *
 * @param {function} fn Function to test
 * @param {*} expected Expected Value
 * @param {...*} [args] Arguments to pass to the function
 *
 * @returns { () => void }
 *
 */

export function expecting(fn, expected, ...args) {

    const fnC = fn;
    const expectedC = expected;
    const argsC = args;

    return () => { assert.deepStrictEqual(fnC(...argsC), expectedC); };

}
