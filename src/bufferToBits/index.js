/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-bitwise */

/**
 *
 * Takes a little endian bitmask represented as a buffer, and returns
 * it as a array of boolean representing the setting of the bits
 *
 * @param {Buffer} buffer The buffer to transform to bits
 * @returns {Array<boolean>} An array of booleans corresponding to the bits of the buffer
 */

export const bufferToBooleanLE = (buffer) => {

    /**
     * @type {Array<boolean>}
     */
    const bits = [];
    const { length } = buffer;

    for (let i = 0; i < length; i++) {

        const byte = buffer[length - i - 1];

        const b = i * 8;

        bits[b + 0] = !!((byte & 0b00000001));
        bits[b + 1] = !!((byte & 0b00000010));
        bits[b + 2] = !!((byte & 0b00000100));
        bits[b + 3] = !!((byte & 0b00001000));
        bits[b + 4] = !!((byte & 0b00010000));
        bits[b + 5] = !!((byte & 0b00100000));
        bits[b + 6] = !!((byte & 0b01000000));
        bits[b + 7] = !!((byte & 0b10000000));

    }

    return bits;

};

/**
 *
 * Takes a big endian bitmask represented as a buffer, and returns
 * it as a array of boolean representing the setting of the bits
 *
 * @param {Buffer} buffer The mask (buffer) to check the bits on
 * @returns {Array<boolean>} An array of booleans corresponding to the bits of the buffer
 */

export const bufferToBooleanBE = (buffer) => {

    /**
     * @type {Array<boolean>}
     */
    const bits = [];

    for (let i = 0; i < buffer.length; i++) {

        const byte = buffer[i];

        const b = i * 8;

        bits[b + 0] = !!((byte & 0b00000001));
        bits[b + 1] = !!((byte & 0b00000010));
        bits[b + 2] = !!((byte & 0b00000100));
        bits[b + 3] = !!((byte & 0b00001000));
        bits[b + 4] = !!((byte & 0b00010000));
        bits[b + 5] = !!((byte & 0b00100000));
        bits[b + 6] = !!((byte & 0b01000000));
        bits[b + 7] = !!((byte & 0b10000000));

    }

    return bits;

};

/**
 *
 * Takes a little endian bitmask represented as a buffer, and returns
 * it as a array of number representing the setting of the bits
 *
 * @param {Buffer} buffer The buffer to transform to bits
 * @returns {Array<number>} An array of booleans corresponding to the bits of the buffer
 */

export const bufferToBitsLE = (buffer) => {

    /**
     * @type {Array<number>}
     */
    const bits = [];
    const { length } = buffer;

    for (let i = 0; i < length; i++) {

        const byte = buffer[length - i - 1];

        const b = i * 8;

        bits[b + 0] = (byte & 0b00000001) >> 0;
        bits[b + 1] = (byte & 0b00000010) >> 1;
        bits[b + 2] = (byte & 0b00000100) >> 2;
        bits[b + 3] = (byte & 0b00001000) >> 3;
        bits[b + 4] = (byte & 0b00010000) >> 4;
        bits[b + 5] = (byte & 0b00100000) >> 5;
        bits[b + 6] = (byte & 0b01000000) >> 6;
        bits[b + 7] = (byte & 0b10000000) >> 7;

    }

    return bits;

};

/**
 *
 * Takes a big endian bitmask represented as a buffer, and returns
 * it as a array of number representing the setting of the bits
 *
 * @param {Buffer} buffer The mask (buffer) to check the bits on
 * @returns {Array<number>} An array of booleans corresponding to the bits of the buffer
 */

export const bufferToBitsBE = (buffer) => {

    /**
     * @type {Array<number>}
     */
    const bits = [];

    for (let i = 0; i < buffer.length; i++) {

        const byte = buffer[i];

        const b = i * 8;

        bits[b + 0] = (byte & 0b00000001) >> 0;
        bits[b + 1] = (byte & 0b00000010) >> 1;
        bits[b + 2] = (byte & 0b00000100) >> 2;
        bits[b + 3] = (byte & 0b00001000) >> 3;
        bits[b + 4] = (byte & 0b00010000) >> 4;
        bits[b + 5] = (byte & 0b00100000) >> 5;
        bits[b + 6] = (byte & 0b01000000) >> 6;
        bits[b + 7] = (byte & 0b10000000) >> 7;

    }

    return bits;

};
