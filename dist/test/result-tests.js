"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var result_1 = require("../src/result");
describe('Result test', function () {
    var UnitTestingService = (function () {
        function UnitTestingService() {
        }
        UnitTestingService.prototype.execute = function (value) {
            return { data: value };
        };
        return UnitTestingService;
    }());
    var UnitTestingErrorService = (function () {
        function UnitTestingErrorService() {
        }
        UnitTestingErrorService.prototype.execute = function (_value) {
            throw new Error('Application failed on unit testing.');
        };
        return UnitTestingErrorService;
    }());
    it('can create with factory method', function () {
        var errors = ['Value is null'];
        var r = result_1.Result.errorsOf(errors);
        expect(r.isFailure()).toBe(true);
        expect(r.errors.get(0)).toBe('Value is null');
    });
    it('should call lambda on sucessed', function () {
        var result = result_1.Result.runCatching(function () {
            return new UnitTestingService().execute('unittest');
        })
            .onSuccess(function (v) {
            console.log("response => ".concat(v));
        });
        expect(result.getOrThrow()).toEqual({ data: 'unittest' });
    });
    it('should handle error', function () {
        var result = result_1.Result.runCatching(function () {
            return new UnitTestingErrorService().execute('unittest');
        })
            .onFailure('runtimeexception', function (it) {
            console.log(_this);
            throw it;
        });
        expect(result.isFailure()).toBe(true);
        expect(result.errors.size).toBe(1);
        expect(result.errors.get(0)).toBe('runtimeexception');
    });
    it('can instantiate Result directly', function () {
        var res = new UnitTestingService().execute('unittest');
        var result = result_1.Result.of(res);
        expect(result.getOrThrow()).toEqual({ data: 'unittest' });
    });
    it('should fold with successing executing service class', function () {
        var count = result_1.Result.runCatching(function () {
            return new UnitTestingService().execute('unittest');
        })
            .fold(function (data) {
            console.log(data);
            return data.data.length;
        }, function (it) {
            console.log(it);
            return 0;
        });
        expect(count).toBe(8);
    });
    it('should fold with successing executing error service class', function () {
        var count = result_1.Result.runCatching(function () {
            return new UnitTestingErrorService().execute('unittest');
        })
            .fold(function (data) {
            console.log(data);
            return data.data.length;
        }, function (it) {
            console.log(it);
            return 0;
        });
        expect(count).toBe(0);
    });
    it('should map result to another result on failure', function () {
        result_1.Result.runCatching(function () {
            return new UnitTestingErrorService().execute('unittest');
        })
            .map(function (res) {
            return res.data.length;
        })
            .onFailure(function (it) {
            expect(it.message).toBe('Application failed on unit testing.');
        });
    });
    it('should map result to another result on success', function () {
        result_1.Result.runCatching(function () {
            return new UnitTestingService().execute('unittest');
        })
            .map(function (res) {
            return res.data.length;
        })
            .onSuccess(function (it) {
            expect(it).toBe(8);
        });
    });
    it('should get value successfully', function () {
        var r = result_1.Result.runCatching(function () {
            return new UnitTestingService().execute('unittest');
        })
            .getOrElse(function (it) {
            console.log(it);
            return {
                data: 'NONE',
            };
        });
        expect(r.data).toBe('unittest');
    });
    it('should get value by failure action', function () {
        var r = result_1.Result.runCatching(function () {
            return new UnitTestingErrorService().execute('unittest');
        })
            .getOrElse(function (it) {
            console.log(it);
            return {
                data: 'default',
            };
        });
        expect(r.data).toBe('default');
    });
});
//# sourceMappingURL=result-tests.js.map