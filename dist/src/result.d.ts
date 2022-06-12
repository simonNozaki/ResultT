export declare class Resultt<T> {
    private readonly _value;
    constructor();
    constructor(value: T);
    static failure(error: Error): Failure<Error>;
    isFailure(): boolean;
    isSuccess(): boolean;
    onFailure(consumer?: (it?: Error) => void): Resultt<T>;
    onSuccess(consumer: (arg: T) => void): Resultt<T>;
    fold<R>(onSuccess: (value?: T) => R, onFailure: (earg?: Error) => R): R;
    map<R>(transform: (arg?: T) => R): Resultt<R>;
    mapCatching<R>(transform: (arg?: T) => R): Resultt<R>;
    recover<R>(transform: (arg?: Error) => R): Resultt<R>;
    recoverCatching<R>(transform: (arg?: Error) => R): Resultt<R>;
    getOrThrow(e?: Error): T;
    getOrDefault(elseValue: T): T;
    getOrElse<R>(onFailure: (earg?: Error) => R): R;
    getOrNull(): T | null;
    toString(): string;
    private throwOnFailure;
    static runCatching<T>(supplier: () => T): Resultt<T>;
}
declare class Failure<T> extends Resultt<T> {
    private _error;
    constructor(_error: T);
    get error(): T;
    toString(): string;
}
export {};
