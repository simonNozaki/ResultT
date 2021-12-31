resultt / [Exports](modules.md)

# ResultT
ts/js users cannot use try-catch as expression so that we have to struggle with complicated runtimes.

ResultT is type-safe runtime wrapping library. Strongly inspired by [Kotlin Result](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/) implementation.

## Install
From npm registry...
```
npm i resultt
```
type declaration is included.

class import...
```typescript
import { Result } from 'resultt';
```

## Usage
Try to start from `runCatching` method. This wraps the result of success or failure.
```typescript
// sample logic and response interface
interface Response {
    data: string
}
class Service {
    /**
     * @param {string} value
     * @return {Response}
     */
    execute(value: string): Response {
    return {data: value};
    }
}

// execute some function and wrap by "runCatching"
const result: Result<Response, unknown> = Result.runCatching(() => {
        return new Service().execute('execution');
    })
    .onSuccess((v) => {
        console.log(`response => ${v}`);
        return v
    });
    .onFailure((it: Error) => {
        console.error(it);
        return {
            data: 'DEFAULT'
        };
    });

// You may get the value of execute by "get" functions as declarative.
const v1 = result.getOrThrow();
const v2 = result.getOrElse({
    data: 'OTHER'
});

// You can process as commandly.
let v;
if (result.isSuccess()) {
    v = result.getOrThrow();
}

// Map the result to another map by fold.
const folded: number = Result.runCatching(() => {
        return new Service().execute('execution');
    })
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
```

## For more info...
Full class documentation is here: [docs](./docs/classes/Result.md)
