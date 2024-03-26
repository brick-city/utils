export namespace noopLogger {
    function fatal(): void;
    function error(): void;
    function warn(): void;
    function info(): void;
    function debug(): void;
    function trace(): void;
    function silent(): void;
    function child(): {
        fatal: () => void;
        error: () => void;
        warn: () => void;
        info: () => void;
        debug: () => void;
        trace: () => void;
        silent: () => void;
        child: () => any;
        level: number;
        isLevelEnabled: () => boolean;
    };
    let level: number;
    function isLevelEnabled(): boolean;
}
export type PinoLogFn = {
    (obj: unknown, msg?: string, ...args: any[]): void;
    (msg: string, ...args: any[]): void;
};
export type PinoLogger = {
    fatal: PinoLogFn;
    error: PinoLogFn;
    warn: PinoLogFn;
    info: PinoLogFn;
    debug: PinoLogFn;
    trace: PinoLogFn;
    silent: PinoLogFn;
    child: (arg0: [object]) => PinoLogger;
    level: number;
    isLevelEnabled: (arg0: string) => boolean;
};
//# sourceMappingURL=index.d.ts.map