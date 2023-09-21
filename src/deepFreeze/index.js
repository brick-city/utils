import { isPlainObject } from '../isPlainObject/index.js';

/* eslint-disable import/prefer-default-export */
/**
 *
 * @description Deepfreezes a plain object, and avoids Buffer types and other non-plain objects
 *
 * @template {Object.<string, any>} T
 *
 * @param {T} obj
 * @returns {T}
 *
 */

export const deepFreeze = (obj) => {

    if (!isPlainObject(obj)) { throw new TypeError('Expecting a plain object'); }

    Object.keys(obj).forEach((prop) => {

        if (isPlainObject(obj[prop])) deepFreeze(obj[prop]);

    });

    Object.freeze(obj);

    return obj;

};
