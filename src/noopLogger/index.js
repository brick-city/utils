/**
 * @typedef {{
 *   (obj: unknown, msg?: string, ...args: any[]): void;
 *   (msg: string, ...args: any[]): void;
 * }} PinoLogFn
 */

/**
 * @typedef {Object} PinoLogger
 * @property {PinoLogFn} fatal
 * @property {PinoLogFn} error
 * @property {PinoLogFn} warn
 * @property {PinoLogFn} info
 * @property {PinoLogFn} debug
 * @property {PinoLogFn} trace
 * @property {PinoLogFn} silent
 * @property {function(): PinoLogger} child
 * @property {number} level
 * @property {function(string): boolean} isLevelEnabled
 */

/**
 *
 * An object that implements the same interface as a pino logger,
 * but does nothing.
 *
 */

// eslint-disable-next-line import/prefer-default-export
export /** @type {PinoLogger} */ const noopLogger = {

    fatal: () => {},
    error: () => {},
    warn: () => {},
    info: () => {},
    debug: () => {},
    trace: () => {},
    silent: () => {},
    child: function child() { return this; },
    level: Infinity,
    isLevelEnabled: () => false,

};
