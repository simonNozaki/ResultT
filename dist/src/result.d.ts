import { List } from 'immutable';
export declare class Result<T, E> {
    private readonly _errors;
    private readonly _value;
    private readonly DEFAULT_ERROR_MESSAGE;
    get errors(): List<E>;
    protected constructor();
    protected constructor(value: T);
    protected constructor(errors: E[]);
    protected constructor(value: T, errors: E[]);
    static of<T, E>(_value: T, _errors?: E[]): Result<T, E>;
    static errorsOf<T extends Error, E>(_errors: E[]): Failure<T, E>;
    addError(message: E): Result<T, E>;
    isFailure(): boolean;
    isSuccess(): boolean;
    onFailure(message?: E, consumer?: (it?: Error) => void): Result<T, E>;
    onSuccess(consumer: (arg: T) => void): Result<T, E>;
    fold<R>(onSuccess: (value?: T, errors?: E[]) => R, onFailure: (earg?: Error) => R): R;
    map<R>(transform: (arg?: T) => R): Result<R, E>;
    getOrThrow(e?: Error): T;
    getOrDefault(elseValue: T): T;
    getOrElse<R>(onFailure: (earg?: Error) => R): R;
    private throwOnFailure;
    static runCatching<T, E>(supplier: () => T): Result<T, E>;
}
declare class Failure<T, E> extends Result<T, E> {
    private _error;
    constructor(_error: T);
    get error(): T;
}
export {};
