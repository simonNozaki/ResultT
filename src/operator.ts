import * as _ from 'underscore';

/**
 * Predicate Operator: equal. This helper operator utilizes `Resultt#filter`
 * @param {T} v1
 * @param {T} v2
 * @return {boolean}
 */
export const eq = <T>(v1: T) => (v2: T): boolean => _.isEqual(v1, v2);

/**
 * Predicate Operator: not equal. This helper operator utilizes `Resultt#filter`
 * @param {T} v1
 * @param {T} v2
 * @return {boolean}
 */
export const ne = <T>(v1: T) => (v2: T): boolean => !_.isEqual(v1, v2);

/**
 * Utility function for higher kind functions.
 * Create a new function that evaluate a value immediatelly.
 * @param {T} value
 * @return {Function} a function that return `v`
 */
export const supply = <T>(value: T) => (): T => {
  return value;
};

/**
 * Utility function for higher kind functions.
 * Create a new function that receive Error
 * @param {T} v
 * @return {Function} a function that receive Error and return `v`
 */
export const onErrorThen = <T>(v: T) => (e: Error) => {
  return v;
};
