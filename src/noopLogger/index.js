/**
 *
 * An object that implements the same interface as a pino logger,
 * but does nothing.
 *
 */

// eslint-disable-next-line import/prefer-default-export
export const noopLogger = {

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
