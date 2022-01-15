[resultt](../README.md) / [Exports](../modules.md) / Resultt

# Class: Resultt<T\>

Base class for runtime result.
This class may express the context for a runtime and its result. <br>
Highly inspired by Kotlin Result/runCatching.

**`param`** Type parameter for error value.

**`see`** usage ... test/appliation/result-test.ts

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type parameter for main value. |

## Table of contents

### Constructors

- [constructor](Resultt.md#constructor)

### Properties

- [DEFAULT\_ERROR\_MESSAGE](Resultt.md#default_error_message)
- [\_value](Resultt.md#_value)

### Methods

- [fold](Resultt.md#fold)
- [getOrDefault](Resultt.md#getordefault)
- [getOrElse](Resultt.md#getorelse)
- [getOrThrow](Resultt.md#getorthrow)
- [isFailure](Resultt.md#isfailure)
- [isSuccess](Resultt.md#issuccess)
- [map](Resultt.md#map)
- [onFailure](Resultt.md#onfailure)
- [onSuccess](Resultt.md#onsuccess)
- [throwOnFailure](Resultt.md#throwonfailure)
- [runCatching](Resultt.md#runcatching)

## Constructors

### constructor

• **new Resultt**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[result.ts:20](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L20)

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

[result.ts:21](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L21)

## Properties

### DEFAULT\_ERROR\_MESSAGE

• `Private` `Readonly` **DEFAULT\_ERROR\_MESSAGE**: ``"Unexpcted error be thrown on applying operator"``

#### Defined in

[result.ts:17](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L17)

___

### \_value

• `Private` `Readonly` **\_value**: `Option`<`T`\>

Successed data of this object

#### Defined in

[result.ts:16](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L16)

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

[result.ts:82](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L82)

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

[result.ts:137](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L137)

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

[result.ts:150](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L150)

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

[result.ts:122](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L122)

___

### isFailure

▸ **isFailure**(): `boolean`

Return true if the result was failed.

#### Returns

`boolean`

#### Defined in

[result.ts:34](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L34)

___

### isSuccess

▸ **isSuccess**(): `boolean`

Return true if the result was successed.

#### Returns

`boolean`

#### Defined in

[result.ts:42](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L42)

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

[result.ts:102](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L102)

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

[result.ts:51](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L51)

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

[result.ts:67](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L67)

___

### throwOnFailure

▸ `Private` **throwOnFailure**(): `void`

#### Returns

`void`

#### Defined in

[result.ts:165](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L165)

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

[result.ts:178](https://github.com/simonNozaki/ResultT/blob/cba32ef/src/result.ts#L178)
