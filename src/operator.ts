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
