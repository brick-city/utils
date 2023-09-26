export namespace noopLogger {
    function fatal(): void;
    function error(): void;
    function warn(): void;
    function info(): void;
    function debug(): void;
    function trace(): void;
    function child(): {
        fatal: () => void;
        error: () => void;
        warn: () => void;
        info: () => void;
        debug: () => void;
        trace: () => void;
        child: () => any;
    };
}
//# sourceMappingURL=index.d.ts.map