"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ne = exports.eq = void 0;
var _ = require("underscore");
var eq = function (v1) { return function (v2) { return _.isEqual(v1, v2); }; };
exports.eq = eq;
var ne = function (v1) { return function (v2) { return !_.isEqual(v1, v2); }; };
exports.ne = ne;
//# sourceMappingURL=operator.js.map