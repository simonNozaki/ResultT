/* eslint-disable new-cap */
import {option} from 'fp-ts';
import {none, Option} from 'fp-ts/lib/Option';
import {List} from 'immutable';

/**
 * Base class for runtime result.
 * This class may express the context for a runtime and its result. <br>
 * Highly inspired by Kotlin Result/runCatching.
 *
 * @param {T} T Type parameter for main value.
 * @param {E} E Type parameter for error value.
 * @see usage ... test/appliation/result-test.ts
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
    return this instanceof Failure;
  }

  /**
   * Return true if the result was successed.
   * @return {boolean}
   */
  isSuccess(): boolean {
    return !this.isFailure();
  }

  /**
   * Set action on failure.
   * @param {E} message custom message value on failure if want.
   * @param {()} consumer action on failure.
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
    if (consumer && isError(this._value)) {
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
   * @param {function} onSuccess higher kinded function for succesing
   * @param {function} onFailure higher kinded function for failing
   * @param {R} R Type parameter folded to
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
    if (option.isSome(this._value) && isError(this._value.value)) {
      return onFailure(this._value.value);
    }
    throw new Error(this.DEFAULT_ERROR_MESSAGE);
  }

  /**
   * Map the result to another result, transforming by the argument.
   * @param {function} transform callback function for mapping another Result.
   * @return {Result<R, E>}
   */
  map<R>(transform: (arg?: T) => R): Result<R, E> {
    if (this.isSuccess()) {
      if (option.isSome(this._value)) {
        return new Result<R, E>(transform(this._value.value));
      }
      return new Result<R, E>(transform());
    }
    if (option.isSome(this._value) && isError(this._value.value)) {
      const v: unknown = this._value.value as unknown;
      return new Failure<R, E>(v as R);
    }
    throw new Error(this.DEFAULT_ERROR_MESSAGE);
  }

  /**
   * Get a value of this result or throw error if not.
   * @param {Error} e Some Error if want.
   * No parameter passed throw default Error.
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
    if (isError(this._value)) {
      // _value should have an error instance
      throw this._value;
    }
  }

  /**
   * Wrapping actions and return Result instance.
   * Force the first type parameter type of Error
   * when the action result catch Error.
   * @param {()} supplier function to be called
   * @return {Result<any, any>} The result of execution in argument supplier.
   */
  static runCatching<T, E>(supplier: () => T): Result<T, E> {
    try {
      return new Result<T, E>(supplier());
    } catch (e) {
      return new Failure<T, E>(e);
    }
  }
}

const isError = (arg: unknown): arg is Error => {
  return typeof arg === 'object' && 'name' in arg && 'message' in arg;
};

/**
 * Result of failure. This class is instanciated on catching an error
 */
class Failure<T, E> extends Result<T, E> {
  /**
   * @param {Error} _error
   */
  constructor(private _error: T) {
    super(_error);
    if (!isError(_error)) {
      throw new Error('Failure must have the value of Error.');
    }
  }
  /**
   * @return {Error}
   */
  get error(): T {
    return this._error;
  }
}
