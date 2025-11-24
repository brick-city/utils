/**
 *
 * Checks to see if the passed value is a valid Date object.
 * A valid Date is an instance of Date with a real timestamp (not NaN).
 * Invalid dates like new Date("invalid") will return false.
 *
 * @param {any} value Object to check
 * @returns {boolean} Returns true if value is a valid Date, otherwise false
 *
 */

export const isDateValid = (value) => value instanceof Date && !Number.isNaN(value.getTime());
