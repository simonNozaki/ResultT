export declare class Resultt<T> {
    private readonly _value;
    private readonly DEFAULT_ERROR_MESSAGE;
    constructor();
    constructor(value: T);
    isFailure(): boolean;
    isSuccess(): boolean;
    onFailure(consumer?: (it?: Error) => void): Resultt<T>;
    onSuccess(consumer: (arg: T) => void): Resultt<T>;
    fold<R>(onSuccess: (value?: T) => R, onFailure: (earg?: Error) => R): R;
    map<R>(transform: (arg?: T) => R): Resultt<R>;
    getOrThrow(e?: Error): T;
    getOrDefault(elseValue: T): T;
    getOrElse<R>(onFailure: (earg?: Error) => R): R;
    private throwOnFailure;
    static runCatching<T>(supplier: () => T): Resultt<T>;
}
