export declare const eq: <T>(v1: T) => (v2: T) => boolean;
export declare const ne: <T>(v1: T) => (v2: T) => boolean;
export declare const supply: <T>(value: T) => () => T;
export declare const onErrorThen: <T>(v: T) => (e: Error) => T;
