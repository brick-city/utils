/* eslint-disable import/prefer-default-export */
/**
 *
 * Deepfreezes an object, and avoids Buffer types
 *
 * @param {Object.<string, any>} obj
 * @returns {void}
 *
 */

export const deepFreeze = (obj) => {

    if (typeof obj !== 'object') { throw new TypeError('Expecting an object'); }

    Object.keys(obj).forEach((prop) => {

        if (!Buffer.isBuffer(obj[prop]) && typeof obj[prop] === 'object') deepFreeze(obj[prop]);

    });

    Object.freeze(obj);

};
