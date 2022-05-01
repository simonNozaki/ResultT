[resultt](../README.md) / [Exports](../modules.md) / Resultt

# Class: Resultt<T\>

Base class for runtime result.
This class may express the context for a runtime and its result. <br>
Highly inspired by Kotlin Result/runCatching.

**`see`** usage ... test/appliation/result-test.ts

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type parameter for main value. |

## Table of contents

### Constructors

- [constructor](Resultt.md#constructor)

### Properties

- [\_value](Resultt.md#_value)

### Methods

- [fold](Resultt.md#fold)
- [getOrDefault](Resultt.md#getordefault)
- [getOrElse](Resultt.md#getorelse)
- [getOrNull](Resultt.md#getornull)
- [getOrThrow](Resultt.md#getorthrow)
- [isFailure](Resultt.md#isfailure)
- [isSuccess](Resultt.md#issuccess)
- [map](Resultt.md#map)
- [onFailure](Resultt.md#onfailure)
- [onSuccess](Resultt.md#onsuccess)
- [throwOnFailure](Resultt.md#throwonfailure)
- [toString](Resultt.md#tostring)
- [runCatching](Resultt.md#runcatching)

## Constructors

### constructor

• **new Resultt**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[result.ts:18](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L18)

• **new Resultt**<`T`\>(`value`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Defined in

[result.ts:19](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L19)

## Properties

### \_value

• `Private` `Readonly` **\_value**: `Option`<`T`\>

Successed data of this object

#### Defined in

[result.ts:16](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L16)

## Methods

### fold

▸ **fold**<`R`\>(`onSuccess`, `onFailure`): `R`

Map the value of this result to another instance typed R.
If this function cannot return another instance, throw Error.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onSuccess` | (`value?`: `T`) => `R` | higher kinded function for succesing |
| `onFailure` | (`earg?`: `Error`) => `R` | higher kinded function for failing |

#### Returns

`R`

#### Defined in

[result.ts:81](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L81)

___

### getOrDefault

▸ **getOrDefault**(`elseValue`): `T`

Get the value of this result or default value in argument

#### Parameters

| Name | Type |
| :------ | :------ |
| `elseValue` | `T` |

#### Returns

`T`

#### Defined in

[result.ts:138](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L138)

___

### getOrElse

▸ **getOrElse**<`R`\>(`onFailure`): `R`

Get the value of type R by applying action.
Shorthand for the method `fold`.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onFailure` | (`earg?`: `Error`) => `R` | the action on failure |

#### Returns

`R`

#### Defined in

[result.ts:151](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L151)

___

### getOrNull

▸ **getOrNull**(): `T`

Get the encapsulated value of this class instance if success.

#### Returns

`T`

#### Defined in

[result.ts:167](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L167)

___

### getOrThrow

▸ **getOrThrow**(`e?`): `T`

Get a value of this result or throw error if not.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e?` | `Error` | Some Error if want. No parameter passed throw default Error. |

#### Returns

`T`

#### Defined in

[result.ts:123](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L123)

___

### isFailure

▸ **isFailure**(): `boolean`

Return true if the result was failed.

#### Returns

`boolean`

#### Defined in

[result.ts:32](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L32)

___

### isSuccess

▸ **isSuccess**(): `boolean`

Return true if the result was successed.

#### Returns

`boolean`

#### Defined in

[result.ts:40](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L40)

___

### map

▸ **map**<`R`\>(`transform`): [`Resultt`](Resultt.md)<`R`\>

Map the result to another result, transforming by the argument.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transform` | (`arg?`: `T`) => `R` | callback function for mapping another Result. |

#### Returns

[`Resultt`](Resultt.md)<`R`\>

#### Defined in

[result.ts:103](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L103)

___

### onFailure

▸ **onFailure**(`consumer?`): [`Resultt`](Resultt.md)<`T`\>

Set action on failure.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `consumer?` | (`it?`: `Error`) => `void` | action on failure. |

#### Returns

[`Resultt`](Resultt.md)<`T`\>

#### Defined in

[result.ts:49](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L49)

___

### onSuccess

▸ **onSuccess**(`consumer`): [`Resultt`](Resultt.md)<`T`\>

Set an additional action on successing

#### Parameters

| Name | Type |
| :------ | :------ |
| `consumer` | (`arg`: `T`) => `void` |

#### Returns

[`Resultt`](Resultt.md)<`T`\>

#### Defined in

[result.ts:66](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L66)

___

### throwOnFailure

▸ `Private` **throwOnFailure**(): `void`

#### Returns

`void`

#### Defined in

[result.ts:187](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L187)

___

### toString

▸ **toString**(): `string`

Return the string expression of this class instance.

#### Returns

`string`

#### Defined in

[result.ts:177](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L177)

___

### runCatching

▸ `Static` **runCatching**<`T`\>(`supplier`): [`Resultt`](Resultt.md)<`T`\>

Wrapping actions and return Result instance.
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

[`Resultt`](Resultt.md)<`T`\>

The result of execution in argument supplier.

#### Defined in

[result.ts:200](https://github.com/simonNozaki/ResultT/blob/6e3a5d7/src/result.ts#L200)
