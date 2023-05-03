/* eslint-disable import/prefer-default-export */
/* eslint-disable no-bitwise */

/**
 *
 * Takes a MSSQL cdc update mask represented as a buffer, and returns
 * an array of boolean representing the change status of the column
 *
 * The array index represents the column ordinal, so index 0 will always be undefined
 * as column ordinals are 1 based
 *
 * @param {Buffer} updateMask The update mask buffer to transform
 * @returns {Array<boolean>} An array of booleans corresponding to the changed status of the column ordinals
 *
 */

export const mssqlCdcUpdateMaskToBooleanArray = (updateMask) => {

    if (!Buffer.isBuffer(updateMask)) { throw new TypeError('Expecting a buffer'); }

    /**
     * @type {Array<boolean>}
     */
    const ordinals = [];
    const { length } = updateMask;

    for (let i = 0; i < length; i++) {

        const byte = updateMask[length - i - 1];

        const b = i * 8;

        ordinals[b + 1] = !!((byte & 0b00000001));
        ordinals[b + 2] = !!((byte & 0b00000010));
        ordinals[b + 3] = !!((byte & 0b00000100));
        ordinals[b + 4] = !!((byte & 0b00001000));
        ordinals[b + 5] = !!((byte & 0b00010000));
        ordinals[b + 6] = !!((byte & 0b00100000));
        ordinals[b + 7] = !!((byte & 0b01000000));
        ordinals[b + 8] = !!((byte & 0b10000000));

    }

    return ordinals;

};

/**
 *
 * Takes a MSSQL cdc update mask represented as a buffer, and returns
 * it as a array of <0/1> representing the change status of the column
 *
 * The array index represents the column ordinal, so index 0 will always be undefined
 * as column ordinals are 1 based
 *
 * @param {Buffer} updateMask The update mask buffer to transform
 * @returns {Array<0|1>} An array of bits corresponding to the bits of the buffer
 *
 */

export const mssqlCdcUpdateMaskToBitArray = (updateMask) => {

    if (!Buffer.isBuffer(updateMask)) { throw new TypeError('Expecting a buffer'); }

    /**
     * @type {Array<0|1>}
     */
    const ordinals = [];
    const { length } = updateMask;

    for (let i = 0; i < length; i++) {

        const byte = updateMask[length - i - 1];

        const b = i * 8;

        ordinals[b + 1] = /** @type {0|1} */ ((byte & 0b00000001) >> 0);
        ordinals[b + 2] = /** @type {0|1} */ ((byte & 0b00000010) >> 1);
        ordinals[b + 3] = /** @type {0|1} */ ((byte & 0b00000100) >> 2);
        ordinals[b + 4] = /** @type {0|1} */ ((byte & 0b00001000) >> 3);
        ordinals[b + 5] = /** @type {0|1} */ ((byte & 0b00010000) >> 4);
        ordinals[b + 6] = /** @type {0|1} */ ((byte & 0b00100000) >> 5);
        ordinals[b + 7] = /** @type {0|1} */ ((byte & 0b01000000) >> 6);
        ordinals[b + 8] = /** @type {0|1} */ ((byte & 0b10000000) >> 7);

    }

    return ordinals;

};
