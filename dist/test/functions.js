var map = function (transformer, elements) {
    return elements.map(transformer);
};
var filter = function (predicate, elements) {
    return elements.filter(predicate);
};
var println = function (o) {
    console.log(o);
};
(println(filter(function (n) { return n > 10; }, (map(function (n) { return n * 2; }, [1, 3, 5, 6, 7, 9, 11])))));
//# sourceMappingURL=functions.js.map