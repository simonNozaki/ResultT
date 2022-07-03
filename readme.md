[![CircleCI](https://circleci.com/gh/simonNozaki/resultify/tree/main.svg?style=svg)](https://circleci.com/gh/simonNozaki/resultify/tree/main)
![NPM](https://img.shields.io/npm/l/@snozaki/result-ts)

# resultify
This project was developed to wrap processes that might raise exceptions and to handle the results declaratively and safely.
The basic control syntax of TypeScript is a "statement". Therefore, the scope of an expression changes before and after a statement, and the process of initializing -> assigning a variable is written.
Not only in TypeScript, but also in classical procedural programming, you will often write code like the following

````
let res;
try {
  res = doSomething();
} catch (e) {
  // log
}
````

Variables that allow assignment can be dangerous to work with, since you must be constantly aware of the state of the variable as the procedure progresses.
As you can see from the examples in this project, it is possible to handle such dangerous variables in an immutable way.

This project is strongly influenced by [kotlin.Result](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/) and [scala.util.Try](https://www.scala-lang.org/api/2.13.6/scala/util/Try.html) In particular, it is heavily influenced by kotlin.Result, and generally implements the same methods.
However, the methods that can be easily described in kotlin and scala are a bit too cumbersome.


## Install
From npm registry...
```
npm i @snozaki/resultify
```
type declaration is included.

***This repository is moved to `@snozaki/resultify` , so [`ResultT`](https://www.npmjs.com/package/resultt) is depricated.***

## Getting started
You can simply introduce this library by import.

Try to import `runCatching` and pass a higher function to wrap the result.

```typescript
import { runCatching } from 'resultt';

const result = runCatching(() => execute());
```

## Usage
Given sample logic and response interface...
```typescript
interface Response {
    data: string
}
class Service {
    execute(value: string): Response {
      return {data: value};
    }
}
```

### Start from `runCatching`
Try to start from `runCatching` method. This wraps the result of success or failure.

We can handle values to call like `getOrThrow` , `getOrElse` , `getOrDefault` and so on.
```typescript
// execute some function and wrap by "runCatching"
const result: Resultt<Response> = runCatching(() => new Service().execute('execution'))
    // It should be executed "onSuccess".
    .onSuccess((v) => {
        console.log(`response => ${v}`);
    });
    .onFailure((it: Error) => {
        console.error(it);
    });

// You may get the value of execute by "get" functions as declarative.
const v1 = result.getOrThrow();  // => success ... { data: "execution" }
const v2 = result.getOrDefault({
    data: 'OTHER'
});

// You can process as commandly.
let v;
if (result.isSuccess()) {
    v = result.getOrThrow();
}
```

On the way to get the raw value, we can insert some intermediate processes by `onSucess` or `onFailure`.

### Folding, mapping result
The process wrapped `Resultt` can fold or map another value or `Resultt` .

```typescript
// Map the result to another map by fold.
const folded = runCatching(() => (new Service().execute('execution')))
    .fold(
        (data: Response) => {
            console.log(data);
            return data.data.length;
        },
        (it: Error) => {
            console.log(it);
            return 0;
        },
    );
console.log(folded);  // => 9

// Or, shorthand for fold with getOrElse
const n: number = runCatching(() => {
        return new Service().execute('execution');
    })
    .getOrElse((it: Error) => {
            console.log(it);
            return 0;
        },
    );
console.log(n);  // => 9
```

### Recovery
In the same way of `map` and `fold`, `recover` also provides mapping funtion when the original expression falls into `Failure`.
```typescript
const r = runCatching(() => new Service().execute('execution'))
          .recover((e: Error) => ({
            data: 'RECOVERED',
          }))
          .getOrThrow();
console.log(r);  // => { data: 'RECOVERED' }
```

`recover` does not catch Error when the transformation function throws Error. If it wraps by `Resultt`, use `recoverCatching`.


### Filter
Even though an original expression or block is executed successfully, a result value is not always expected value. The executed value is tested  by `filter` like below.
```typescript
const r = runCatching(() =>
        (new Service().execute('execution')))
          .filter((t) => t.data.length > 10)
          .getOrElse(() => ({data: 'message is under 10'}));

console.log(r);  // => {data: 'message is under 10'}
```

## For more info...
Full class documentation is here: [docs](https://github.com/simonNozaki/ResultT/blob/main/docs/classes/Resultt.md)
