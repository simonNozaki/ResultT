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
        UnitTestingErrorService.prototype.run = function (_value) {
            throw new Error('Error occuerd again!');
        };
        return UnitTestingErrorService;
    }());
    it('should call lambda on sucessed', function () {
        var result = result_1.Resultt.runCatching(function () { return (new UnitTestingService().execute('unittest')); })
            .onSuccess(function (v) {
            console.log("response => ".concat(v));
        });
        expect(result.getOrThrow()).toEqual({ data: 'unittest' });
    });
    it('should handle error', function () {
        var error;
        var result = result_1.Resultt.runCatching(function () {
            return new UnitTestingErrorService().execute('unittest');
        })
            .onFailure(function (it) {
            console.log(_this);
            error = it.message;
        });
        expect(result.isFailure()).toBe(true);
        expect(error).toBe('Application failed on unit testing.');
    });
    it('can instantiate Result directly', function () {
        var res = new UnitTestingService().execute('unittest');
        var result = new result_1.Resultt(res);
        expect(result.getOrThrow()).toEqual({ data: 'unittest' });
    });
    it('create failure manually', function () {
        var result = result_1.Resultt.failure(new Error('Manual Error!'));
        expect(result.isFailure()).toBe(true);
    });
    it('should fold with successing executing service class', function () {
        var count = result_1.Resultt.runCatching(function () {
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
        var count = result_1.Resultt.runCatching(function () {
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
        var result = result_1.Resultt.runCatching(function () {
            return new UnitTestingErrorService().execute('unittest');
        })
            .map(function (res) {
            return res.data.length;
        })
            .onFailure(function (it) {
            expect(it.message).toBe('Application failed on unit testing.');
        });
        console.log(result);
        expect(result.isFailure()).toBe(true);
        try {
            expect(result.getOrThrow()).toThrowError(new Error());
        }
        catch (e) {
            console.log('catch!');
        }
    });
    it('should map result to another result on success', function () {
        var result = result_1.Resultt.runCatching(function () {
            return new UnitTestingService().execute('unittest');
        })
            .map(function (res) {
            return res.data.length;
        })
            .onSuccess(function (it) {
            return it;
        });
        expect(result.isSuccess()).toBe(true);
        expect(result.getOrThrow()).toBe(8);
    });
    it('should handle error on mapping the result', function () {
        var resultt = result_1.Resultt.runCatching(function () {
            var res = new UnitTestingService().execute('unittest');
            return res.data.length;
        })
            .mapCatching(function (res) {
            throw new Error('Given the error happened on mapping ...');
        })
            .onFailure(function (it) {
            console.error(it);
        });
        expect(resultt.isFailure()).toBeTruthy();
        expect(resultt.getOrDefault(1)).toBe(1);
    });
    it('should get value successfully', function () {
        var r = result_1.Resultt.runCatching(function () {
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
        var r = result_1.Resultt.runCatching(function () {
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
    it('should get null', function () {
        var r = result_1.Resultt.runCatching(function () {
            return new UnitTestingErrorService().execute('unittest');
        });
        expect(r.getOrNull()).toBeNull();
        expect(r.isFailure()).toBeTruthy();
    });
    it('can recover', function () {
        var r = result_1.Resultt.runCatching(function () {
            return new UnitTestingErrorService().execute('unittest');
        })
            .recover(function (e) { return ({
            data: 'RECOVERED',
        }); })
            .getOrNull();
        expect(r.data).toBe('RECOVERED');
    });
    it('receover and handle error', function () {
        var service = new UnitTestingErrorService();
        var r = result_1.Resultt.runCatching(function () { return (service.execute('unittest')); })
            .recoverCatching(function (e) { return (service.run('try')); })
            .onFailure(function (e) { return console.error(e); })
            .getOrElse(function (e) { return 'RECOVER CATHED'; });
        expect(r).toBe('RECOVER CATHED');
    });
    it('filter on succesing and predicate returns false', function () {
        var r = (0, result_1.runCatching)(function () {
            return (new UnitTestingService().execute('unittest'));
        })
            .filter(function (t) { return t.data.length > 10; })
            .getOrElse(function () { return ({ data: 'message is under 10' }); });
        expect(r.data).toBe('message is under 10');
    });
    it('filter on succesing and predicate returns true', function () {
        var r = (0, result_1.runCatching)(function () {
            return (new UnitTestingService().execute('unittest'));
        })
            .filter(function (t) { return t.data.length > 5; })
            .getOrElse(function () { return ({ data: 'message is under 10' }); });
        expect(r.data).toBe('unittest');
    });
    it('filter on failed', function () {
        var r = (0, result_1.runCatching)(function () {
            return (new UnitTestingErrorService().execute('unittest'));
        })
            .filter(function (t) { return t.data.length > 10; })
            .onFailure(function (it) { return console.error(it); })
            .getOrElse(function () { return ({ data: 'message is under 10' }); });
        expect(r.data).toBe('message is under 10');
    });
});
//# sourceMappingURL=result-tests.js.map