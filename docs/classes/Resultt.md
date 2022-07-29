[@snozaki/resultify](../README.md) / [Exports](../modules.md) / Resultt

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

- [andLastly](Resultt.md#andlastly)
- [filter](Resultt.md#filter)
- [fold](Resultt.md#fold)
- [getFailure](Resultt.md#getfailure)
- [getOrDefault](Resultt.md#getordefault)
- [getOrElse](Resultt.md#getorelse)
- [getOrNull](Resultt.md#getornull)
- [getOrThrow](Resultt.md#getorthrow)
- [isFailure](Resultt.md#isfailure)
- [isSuccess](Resultt.md#issuccess)
- [map](Resultt.md#map)
- [mapCatching](Resultt.md#mapcatching)
- [onFailure](Resultt.md#onfailure)
- [onSuccess](Resultt.md#onsuccess)
- [recover](Resultt.md#recover)
- [recoverCatching](Resultt.md#recovercatching)
- [throwOnFailure](Resultt.md#throwonfailure)
- [toString](Resultt.md#tostring)
- [failure](Resultt.md#failure)
- [runCatching](Resultt.md#runcatching)

## Constructors

### constructor

• **new Resultt**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[result.ts:35](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L35)

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

[result.ts:36](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L36)

## Properties

### \_value

• `Private` `Readonly` **\_value**: `Option`<`T`\>

Successed data of this object

#### Defined in

[result.ts:33](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L33)

## Methods

### andLastly

▸ **andLastly**(`consumer`): [`Resultt`](Resultt.md)<`T`\>

Return Resultt instance with doing `consumer`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `consumer` | () => `void` |

#### Returns

[`Resultt`](Resultt.md)<`T`\>

#### Defined in

[result.ts:223](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L223)

___

### filter

▸ **filter**(`predicate`): [`Resultt`](Resultt.md)<`T`\>

Return [Failure] if the argument `predicate` is evaluated as false.
Internally the method `filter` throws runtime Error
`ValueNotFoundException` if the predicate is false.

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`t`: `T`) => `boolean` |

#### Returns

[`Resultt`](Resultt.md)<`T`\>

#### Defined in

[result.ts:201](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L201)

___

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

[result.ts:107](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L107)

___

### getFailure

▸ `Private` **getFailure**<`T`\>(`message`): `Failure`<`T`\>

Get `Failure` instance initialized with `ValueNotFoundException` .

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Failure`<`T`\>

#### Defined in

[result.ts:310](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L310)

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

[result.ts:249](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L249)

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

[result.ts:262](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L262)

___

### getOrNull

▸ **getOrNull**(): `T`

Get the encapsulated value of this class instance if success.

#### Returns

`T`

#### Defined in

[result.ts:278](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L278)

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

[result.ts:234](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L234)

___

### isFailure

▸ **isFailure**(): `boolean`

Return true if the result was failed.

#### Returns

`boolean`

#### Defined in

[result.ts:58](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L58)

___

### isSuccess

▸ **isSuccess**(): `boolean`

Return true if the result was successed.

#### Returns

`boolean`

#### Defined in

[result.ts:66](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L66)

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

[result.ts:129](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L129)

___

### mapCatching

▸ **mapCatching**<`R`\>(`transform`): [`Resultt`](Resultt.md)<`R`\>

Map the result to another result, transforming by the argument.
`mapCatching` handle errors on executing the argument `transform`.

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

[result.ts:149](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L149)

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

[result.ts:75](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L75)

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

[result.ts:92](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L92)

___

### recover

▸ **recover**<`R`\>(`transform`): [`Resultt`](Resultt.md)<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transform` | (`arg?`: `Error`) => `R` | callback function for mapping another Result. |

#### Returns

[`Resultt`](Resultt.md)<`R`\>

#### Defined in

[result.ts:166](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L166)

___

### recoverCatching

▸ **recoverCatching**<`R`\>(`transform`): [`Resultt`](Resultt.md)<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transform` | (`arg?`: `Error`) => `R` | callback function for mapping another Result. |

#### Returns

[`Resultt`](Resultt.md)<`R`\>

#### Defined in

[result.ts:182](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L182)

___

### throwOnFailure

▸ `Private` **throwOnFailure**(): `void`

#### Returns

`void`

#### Defined in

[result.ts:299](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L299)

___

### toString

▸ **toString**(): `string`

Return the string expression of this class instance.

#### Returns

`string`

#### Defined in

[result.ts:292](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L292)

___

### failure

▸ `Static` **failure**(`error`): `Failure`<`Error`\>

Create Failure instance manually

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `Error` | error |

#### Returns

`Failure`<`Error`\>

Failure

#### Defined in

[result.ts:50](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L50)

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

[result.ts:322](https://github.com/simonNozaki/resultify/blob/6be9a5a/src/result.ts#L322)
