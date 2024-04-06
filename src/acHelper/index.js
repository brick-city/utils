/* eslint-disable import/prefer-default-export */
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
    const signals = Array.isArray(signal) ? signal : [signal];

    if (timeout) {

        const timeoutSignal = AbortSignal.timeout(timeout);

        signals.push(timeoutSignal);

    }

    /** @type {AbortSignal} */
    // @ts-ignore there is a type definition error on AbortSignal, which currently is missing 'any' as a method on AbortSignal
    const abortSignal = AbortSignal.any(signals);

    abortSignal.addEventListener('abort', abortCallback, { once: true });
    abortSignal.addEventListener('abort', abortController.abort, { once: true });

    return abortController;

}
