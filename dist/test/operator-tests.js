"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operator_1 = require("../src/operator");
var src_1 = require("../src");
describe('Operator test', function () {
    var Application = (function () {
        function Application() {
        }
        Application.prototype.execute = function () {
            return 'unit test';
        };
        return Application;
    }());
    it('is equal', function () {
        var r = new src_1.Resultt('unittest').filter((0, operator_1.eq)('unittest'));
        expect(r.isSuccess()).toBeTruthy();
        expect(r.getOrThrow()).toBe('unittest');
    });
    it('should be equal', function () {
        var r = new src_1.Resultt('unittest').filter((0, operator_1.eq)('unit'));
        expect(r.isFailure()).toBeTruthy();
    });
    it('is not equal', function () {
        var r = new src_1.Resultt('unittest').filter((0, operator_1.ne)('unit'));
        expect(r.isSuccess()).toBeTruthy();
        expect(r.getOrThrow()).toBe('unittest');
    });
    it('is deeply equal', function () {
        var r = new src_1.Resultt({
            id: '',
            histories: [
                { message: 'a' },
                { message: 'b' },
                { message: 'c' },
            ],
        }).filter((0, operator_1.eq)({
            id: '',
            histories: [
                { message: 'a' },
                { message: 'b' },
                { message: 'c' },
            ],
        }));
        console.log(r.getOrThrow());
        expect(r.isSuccess()).toBeTruthy();
    });
    it('should run function with operator', function () {
        var r = (0, src_1.runCatching)((0, operator_1.supply)(new Application().execute()))
            .fold((0, operator_1.supply)('success'), (0, operator_1.onErrorThen)('failure'));
        expect(r).toBe('success');
    });
});
//# sourceMappingURL=operator-tests.js.map