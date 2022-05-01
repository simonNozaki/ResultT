declare type ChainedWhen<T, R> = {
    on: <A>(pred: (v: T) => boolean, fn: () => A) => ChainedWhen<T, R | A>;
    else: <A>(fn: () => A) => R | A;
};
export declare const when: <T>(val: T) => {
    on: <A>(pred: (v: T) => boolean, fn: () => A) => ChainedWhen<T, A>;
};
export {};
