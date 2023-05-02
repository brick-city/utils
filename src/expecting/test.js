import assert from 'node:assert';
import { describe, it } from 'node:test';
import { expecting } from './index.js';

const throwingFunction = expecting((/** @type {any} */ a) => a, '99', true);

describe('expecting', () => {

    it('String Match', expecting((/** @type {any} */ a) => a, '99', '99'));

    it('Should Throw, no match', () => {

        assert.throws(throwingFunction);

    });

});
