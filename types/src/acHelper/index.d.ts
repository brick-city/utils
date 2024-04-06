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
export function acHelper({ signal, abortCallback, timeout }: {
    signal: AbortSignal | AbortSignal[];
    timeout?: number;
    abortCallback: EventListener;
}): AbortController;
//# sourceMappingURL=index.d.ts.map