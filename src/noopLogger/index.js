/**
 *
 * An object that implements the same interface as the fastify logger,
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
    child: function child() { return this; },

};
