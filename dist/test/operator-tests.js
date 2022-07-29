"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operator_1 = require("../src/operator");
var src_1 = require("../src");
describe('Operator test', function () {
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
});
//# sourceMappingURL=operator-tests.js.map