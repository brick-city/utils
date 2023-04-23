/* eslint-disable import/prefer-default-export */
/* eslint-disable no-bitwise */

/**
 *
 * Takes a little endian bitmask represented as a buffer, and returns
 * it as a array of boolean representing the setting of the bits
 *
 * @param {Buffer} mask The mask (buffer) to check the bits on
 * @returns {Array<boolean>} An array of booleans corresponding to the bits of the buffer
 */

export const leMaskToBits = (mask) => {

    const bufferLength = mask.byteLength;

    /**
     * @type {Array<boolean>}
     */
    const bits = [];

    mask.forEach((byte, index) => {

        const i = (bufferLength - index - 1) * 8;

        bits[i + 1] = !!(byte & 1);
        bits[i + 2] = !!((byte >> 1) & 1);
        bits[i + 3] = !!((byte >> 2) & 1);
        bits[i + 4] = !!((byte >> 3) & 1);
        bits[i + 5] = !!((byte >> 4) & 1);
        bits[i + 6] = !!((byte >> 5) & 1);
        bits[i + 7] = !!((byte >> 6) & 1);
        bits[i + 8] = !!((byte >> 7) & 1);

    });

    return bits;

};

/**
 *
 * Takes a big endian bitmask represented as a buffer, and returns
 * it as a array of boolean representing the setting of the bits
 *
 * @param {Buffer} mask The mask (buffer) to check the bits on
 * @returns {Array<boolean>} An array of booleans corresponding to the bits of the buffer
 */

export const beMaskToBits = (mask) => {

    /**
     * @type {Array<boolean>}
     */
    const bits = [];

    mask.forEach((byte, index) => {

        const i = (index - 1) * 8;

        bits[i + 1] = !!(byte & 1);
        bits[i + 2] = !!((byte >> 1) & 1);
        bits[i + 3] = !!((byte >> 2) & 1);
        bits[i + 4] = !!((byte >> 3) & 1);
        bits[i + 5] = !!((byte >> 4) & 1);
        bits[i + 6] = !!((byte >> 5) & 1);
        bits[i + 7] = !!((byte >> 6) & 1);
        bits[i + 8] = !!((byte >> 7) & 1);

    });

    return bits;

};
