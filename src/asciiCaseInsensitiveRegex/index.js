/**
 * Creates a case-insensitive regular expression from a given string.
 *
 * @param {string} str - The input string to be converted into a case-insensitive regular expression.
 * @returns {RegExp} - A regular expression that matches the input string in a case-insensitive manner.
 *
 * @example
 * const regex = asciiCaseInsensitiveRegex("Hello*World");
 * console.log(regex); // Output: /[Hh][Ee][Ll][Ll][Oo]\*[Ww][Oo][Rr][Ll][Dd]/
 * console.log(regex.test("hElLo*woRLd")); // Output: true
 */
export const asciiCaseInsensitiveRegex = (str) => {

    if (typeof str !== 'string') {

        throw new TypeError('Expecting a string');

    }

    const pattern = str.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
        .replace(/[a-zA-Z]/g, (char) => `[${char.toUpperCase()}${char.toLowerCase()}]`);
    return new RegExp(pattern);

};
