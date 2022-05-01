"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = void 0;
var match = function (val) { return ({
    on: function (pred, fn) { return match(val); },
    else: function (fn) { return val; },
}); };
var chain = function (val) { return ({
    on: function (pred, fn) {
        return pred(val) ? match(fn()) : chain(val);
    },
    else: function (fn) { return fn(); },
}); };
var when = function (val) { return ({
    on: function (pred, fn) {
        return pred(val) ? match(fn()) : chain(val);
    },
}); };
exports.when = when;
//# sourceMappingURL=when.js.map