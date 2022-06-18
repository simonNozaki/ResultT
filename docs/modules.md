[resultt](README.md) / Exports

# resultt

## Table of contents

### Classes

- [Resultt](classes/Resultt.md)

### Functions

- [runCatching](modules.md#runcatching)

## Functions

### runCatching

▸ **runCatching**<`T`\>(`supplier`): [`Resultt`](classes/Resultt.md)<`T`\>

Top Level shorthand for `Resultt.runCatching(() => ())` .
Force the first type parameter type of Error
when the action result catch Error.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `supplier` | () => `T` | function to be called |

#### Returns

[`Resultt`](classes/Resultt.md)<`T`\>

The result of execution in argument supplier.

#### Defined in

[result.ts:15](https://github.com/simonNozaki/ResultT/blob/11a7626/src/result.ts#L15)
