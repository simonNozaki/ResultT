"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onErrorThen = exports.supply = exports.ne = exports.eq = void 0;
var _ = require("underscore");
var eq = function (v1) { return function (v2) { return _.isEqual(v1, v2); }; };
exports.eq = eq;
var ne = function (v1) { return function (v2) { return !_.isEqual(v1, v2); }; };
exports.ne = ne;
var supply = function (value) { return function () {
    return value;
}; };
exports.supply = supply;
var onErrorThen = function (v) { return function (e) {
    return v;
}; };
exports.onErrorThen = onErrorThen;
//# sourceMappingURL=operator.js.map