/**
 * Simple helper function to perform repetitive tasks when working with AbortController and AbortSignal.
 *
 * @param {object} options
 * @param {AbortSignal | AbortSignal[]} options.signal A signal or an array of signals to listen for abort events.
 *                                                      This would normally be the signal passed to your function
 * @param {number} [options.timeout] If provided, a timeout signal will be created and added to the signals array.
 * @param {EventListener} options.abortCallback The callback to call when the abort event is triggered on any of the signals.
 *                                              Normally this would be when the calling logic wants to abort the operation.
 *                                              Or when your timeout signal triggers.
 * @returns {AbortController} Use this abort controller when you need to abort downstream operations. It does not trigger the abortCallback
 *                            Pass the signal to the async function you want to abort. It will also be aborted from the upstream signals, or timeout.
 *                            Use the signal.aborted in your async function to check if the operation was aborted.
 *
 */

export function acHelper({ signal, abortCallback, timeout }) {

    const abortController = new AbortController();

    /** @type {AbortSignal[]} */
    let signals;

    if (!signal) {

        throw new Error('acHelper: signal is required');

    } else if (Array.isArray(signal)) {

        if (!signal.length) {

            throw new Error('acHelper: signal must not be an empty array');

        } else if (!signal.every((s) => s instanceof AbortSignal)) {

            throw new Error('acHelper: Detected an invalid AbortSignal instance in the signal array');

        } else {

            signals = signal;

        }

    } else if (!(signal instanceof AbortSignal)) {

        throw new Error('acHelper: signal must be an AbortSignal or an array of AbortSignal instances');

    } else {

        signals = [signal];

    }

    if (timeout) {

        if (typeof timeout !== 'number') {

            throw new Error('acHelper: timeout must be a number');

        } else {

            const timeoutSignal = AbortSignal.timeout(timeout);

            signals.push(timeoutSignal);

        }

    }

    if (!abortCallback || typeof abortCallback !== 'function') {

        throw new Error('acHelper: abortCallback is required, and must be a function');

    }

    /** @type {AbortSignal} */
    const abortSignals = AbortSignal.any(signals);

    abortSignals.addEventListener('abort', abortController.abort, { once: true });
    abortSignals.addEventListener('abort', abortCallback, { once: true });

    return abortController;

}

/**
 * Simple helper function to perform repetitive tasks when working with AbortController and AbortSignal.
 *
 * @param {object} options
 * @param {AbortSignal | AbortSignal[]} [options.signal] A signal or an array of signals to listen for abort events.
 *                                                      This would normally be the signal passed to your function
 * @param {number} [options.timeout] If provided, a timeout signal will be created and added to the signals array.
 * @param {EventListener} options.abortCallback The callback to call when the abort event is triggered on any of the signals.
 *                                              Normally this would be when the calling logic wants to abort the operation.
 *                                              Or when your timeout signal triggers.
 * @returns {AbortController} Use this abort controller when you need to abort downstream operations. It does not trigger the abortCallback
 *                            Pass the signal to the async function you want to abort. It will also be aborted from the upstream signals, or timeout.
 *                            Use the signal.aborted in your async function to check if the operation was aborted.
 *
 */

export function acHelperNoSignal({ signal, abortCallback, timeout }) {

    return acHelper({
        signal: signal ?? new AbortController().signal,
        abortCallback,
        timeout,
    });

}
