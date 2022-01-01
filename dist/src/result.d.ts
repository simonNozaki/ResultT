import { List } from 'immutable';
export declare class Result<T, E> {
    private readonly _errors;
    private readonly _value;
    private readonly DEFAULT_ERROR_MESSAGE;
    get errors(): List<E>;
    constructor();
    constructor(value: T);
    constructor(errors: string[]);
    addError(message: E): Result<T, E>;
    isFailure(): boolean;
    isSuccess(): boolean;
    onFailure(message?: E, consumer?: (it?: Error) => void): Result<T, E>;
    onSuccess(consumer: (arg: T) => void): Result<T, E>;
    fold<R>(onSuccess: (value?: T, errors?: E[]) => R, onFailure: (earg?: Error) => R): R;
    map<R>(transform: (arg?: T) => R): Result<R, E>;
    getOrThrow(e?: Error): T;
    getOrElse(elseValue: T): T;
    private throwOnFailure;
    static runCatching<T, E>(supplier: () => T): Result<T, E>;
}
