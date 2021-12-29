/* eslint-disable new-cap */
import {option} from 'fp-ts';
import {none, Option} from 'fp-ts/lib/Option';
import {List} from 'immutable';

/**
 * Base class for runtime result.
 * This class may express the context for a runtime and its result. <br>
 * Highly inspired by Kotlin Result/runCatching.
 *
 * @see usage ... test/appliation/result-test.ts
 * @see {@link https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/}
 */
export class Result<T, E> {
  /** error message or strings */
  private readonly _errors: E[];
  /** Successed data of this object */
  private readonly _value: Option<T>;
  private readonly DEFAULT_ERROR_MESSAGE =
    'Unexpcted error be thrown on applying operator';

  /**
     * Get errors as immutbale list
     */
  get errors(): List<E> {
    return List(this._errors);
  }

  constructor()
  constructor(value: T)
  constructor(errors: string[])
  /**
   *
   * @param {T} value
   * @param {E[]} errors
   */
  constructor(value?: T, errors?: E[]) {
    this._value = value ? option.of(value) : none;
    this._errors = errors ? errors : [];
  }

  /**
   * Add custom error message.
   * This makes caller set an error message only through this method.
   * @param {E} message
   * @return {Result<T, E>}
   */
  addError(message: E): Result<T, E> {
    this._errors.push(message);
    return this;
  }

  /**
   * Return true if the result was failed.
   * @return {boolean}
   */
  isFailure(): boolean {
    return this instanceof Result.Failure;
  }

  /**
   * Return true if the result was successed.
   * @return {boolean}
   */
  isSuccess(): boolean {
    return !this.isFailure();
  }

  /**
   * @param {E} message
   * @param {()} consumer
   * @return {Result<T, E>}
   */
  onFailure(message?: E, consumer?: (it?: Error) => void): Result<T, E> {
    if (this.isSuccess()) {
      return this;
    }
    if (message) {
      this._errors.push(message);
    }
    // call argument consumer with the error of Failure instance
    if (consumer && this.isError(this._value)) {
      consumer(this._value);
    }
    return this;
  }

  /**
   * Set an additional action on successing
   * @param {()} consumer
   * @return {Result<T, E>}
   */
  onSuccess(consumer: (arg: T) => void): Result<T, E> {
    if (option.isSome(this._value)) {
      consumer(this._value.value);
    }
    return this;
  }

  /**
   * Map the value of this result to another instance typed R.
   * If this function cannot return another instance, throw Error.
   * @param {()} onSuccess higher kinded function for succesing
   * @param {()} onFailure higher kinded function for failing
   * @param {R} R Type parameter foled to
   * @return {R}
   */
  fold<R>(
      onSuccess: (value?: T, errors?: E[]) => R,
      onFailure: (earg?: Error) => R,
  ): R {
    if (this.isSuccess()) {
      if (option.isSome(this._value)) {
        return onSuccess(this._value.value);
      }
    }
    if (option.isSome(this._value) && this.isError(this._value.value)) {
      return onFailure(this._value.value);
    }
    throw new Error(this.DEFAULT_ERROR_MESSAGE);
  }

  /**
   * Map the result to another result, transforming by the argument.
   * @param {()} transform
   * @return {Result<R, E>}
   */
  map<R>(transform: (arg?: T) => R): Result<any, E> {
    if (this.isSuccess()) {
      if (option.isSome(this._value)) {
        return new Result<R, E>(transform(this._value.value));
      }
      return new Result<R, E>(transform());
    }
    if (option.isSome(this._value) && this.isError(this._value.value)) {
      return new Result.Failure<E>(this._value.value);
    }
    throw new Error(this.DEFAULT_ERROR_MESSAGE);
  }

  /**
   * Get a value of this result or throw error if not
   * @param {Error} e
   * @return {T}
   */
  getOrThrow(e?: Error): T {
    if (this.isSuccess() && option.isSome(this._value)) {
      return this._value.value;
    }
    if (e) {
      throw e;
    }
    this.throwOnFailure();
  }

  /**
   * Get the value of this result or default value in argument
   * @param {T} elseValue
   * @return {T}
   */
  getOrElse(elseValue: T): T {
    if (this.isSuccess() && option.isSome(this._value)) {
      return this._value.value;
    }
    return elseValue;
  }

  /**
   * @return {void}
   */
  private throwOnFailure(): void {
    if (this.isError(this._value)) {
      // _value should have an error instance
      throw this._value;
    }
  }

  /**
   * Result of failure. This class is instanciated on catching an error
   */
  private static Failure = class <E> extends Result<Error, E> {
    /**
     * @param {Error} _error
     */
    constructor(private _error: Error) {
      super(_error);
    }
    /**
     * @return {Error}
     */
    get error(): Error {
      return this._error;
    }
  };

  /**
   * Check and force compiler to identify value as Error instance
   * @param {()} arg
   * @return {boolean}
   */
  private isError(arg: unknown): arg is Error {
    return typeof arg === 'object' && 'name' in arg && 'message' in arg;
  }

  /**
   * Wrapping actions and return Result instance.
   * Force the first type parameter type of Error
   * when the action result catch Error.
   * @param {()} supplier function to be called
   * @return {Result<any, any>}
   */
  static runCatching<T, E>(supplier: () => T): Result<any, any> {
    try {
      return new Result<T, E>(supplier());
    } catch (e) {
      return new Result.Failure<E>(e);
    }
  }
}
