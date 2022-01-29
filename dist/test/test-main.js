"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var MainService = (function () {
    function MainService() {
    }
    MainService.prototype.execute = function () {
        throw new Error('Error on class MainService');
    };
    return MainService;
}());
var main = function () {
    src_1.Resultt.runCatching(function () {
        return new MainService().execute();
    }).onFailure(function (it) {
        console.log(it.name);
    });
    var result2 = src_1.Resultt.runCatching(function () {
        return new MainService().execute();
    }).fold(function () {
        return {
            data: 'DEFAULT',
        };
    }, function () {
        console.log('Failed');
        return {
            data: 'FAILED',
        };
    });
    console.log(result2.data);
};
main();
//# sourceMappingURL=test-main.js.map