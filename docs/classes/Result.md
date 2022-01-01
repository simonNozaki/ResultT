[resultt](../README.md) / [Exports](../modules.md) / Result

# Class: Result<T, E\>

Base class for runtime result.
This class may express the context for a runtime and its result. <br>
Highly inspired by Kotlin Result/runCatching.

**`see`** usage ... test/appliation/result-test.ts

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Type parameter for main value. |
| `E` | Type parameter for error value. |

## Table of contents

### Constructors

- [constructor](Result.md#constructor)

### Properties

- [DEFAULT\_ERROR\_MESSAGE](Result.md#default_error_message)
- [\_errors](Result.md#_errors)
- [\_value](Result.md#_value)

### Accessors

- [errors](Result.md#errors)

### Methods

- [addError](Result.md#adderror)
- [fold](Result.md#fold)
- [getOrElse](Result.md#getorelse)
- [getOrThrow](Result.md#getorthrow)
- [isFailure](Result.md#isfailure)
- [isSuccess](Result.md#issuccess)
- [map](Result.md#map)
- [onFailure](Result.md#onfailure)
- [onSuccess](Result.md#onsuccess)
- [throwOnFailure](Result.md#throwonfailure)
- [runCatching](Result.md#runcatching)

## Constructors

### constructor

• **new Result**<`T`, `E`\>()

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Defined in

[result.ts:30](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L30)

• **new Result**<`T`, `E`\>(`value`)

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Defined in

[result.ts:31](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L31)

• **new Result**<`T`, `E`\>(`errors`)

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `errors` | `string`[] |

#### Defined in

[result.ts:32](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L32)

## Properties

### DEFAULT\_ERROR\_MESSAGE

• `Private` `Readonly` **DEFAULT\_ERROR\_MESSAGE**: ``"Unexpcted error be thrown on applying operator"``

#### Defined in

[result.ts:20](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L20)

___

### \_errors

• `Private` `Readonly` **\_errors**: `E`[]

error message or strings

#### Defined in

[result.ts:17](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L17)

___

### \_value

• `Private` `Readonly` **\_value**: `Option`<`T`\>

Successed data of this object

#### Defined in

[result.ts:19](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L19)

## Accessors

### errors

• `get` **errors**(): `List`<`E`\>

Get errors as immutbale list

#### Returns

`List`<`E`\>

#### Defined in

[result.ts:26](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L26)

## Methods

### addError

▸ **addError**(`message`): [`Result`](Result.md)<`T`, `E`\>

Add custom error message.
This makes caller set an error message only through this method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `E` |

#### Returns

[`Result`](Result.md)<`T`, `E`\>

#### Defined in

[result.ts:48](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L48)

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
| `onSuccess` | (`value?`: `T`, `errors?`: `E`[]) => `R` | higher kinded function for succesing |
| `onFailure` | (`earg?`: `Error`) => `R` | higher kinded function for failing |

#### Returns

`R`

#### Defined in

[result.ts:109](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L109)

___

### getOrElse

▸ **getOrElse**(`elseValue`): `T`

Get the value of this result or default value in argument

#### Parameters

| Name | Type |
| :------ | :------ |
| `elseValue` | `T` |

#### Returns

`T`

#### Defined in

[result.ts:164](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L164)

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

[result.ts:149](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L149)

___

### isFailure

▸ **isFailure**(): `boolean`

Return true if the result was failed.

#### Returns

`boolean`

#### Defined in

[result.ts:57](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L57)

___

### isSuccess

▸ **isSuccess**(): `boolean`

Return true if the result was successed.

#### Returns

`boolean`

#### Defined in

[result.ts:65](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L65)

___

### map

▸ **map**<`R`\>(`transform`): [`Result`](Result.md)<`R`, `E`\>

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

[`Result`](Result.md)<`R`, `E`\>

#### Defined in

[result.ts:129](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L129)

___

### onFailure

▸ **onFailure**(`message?`, `consumer?`): [`Result`](Result.md)<`T`, `E`\>

Set action on failure.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message?` | `E` | custom message value on failure if want. |
| `consumer?` | (`it?`: `Error`) => `void` | action on failure. |

#### Returns

[`Result`](Result.md)<`T`, `E`\>

#### Defined in

[result.ts:75](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L75)

___

### onSuccess

▸ **onSuccess**(`consumer`): [`Result`](Result.md)<`T`, `E`\>

Set an additional action on successing

#### Parameters

| Name | Type |
| :------ | :------ |
| `consumer` | (`arg`: `T`) => `void` |

#### Returns

[`Result`](Result.md)<`T`, `E`\>

#### Defined in

[result.ts:94](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L94)

___

### throwOnFailure

▸ `Private` **throwOnFailure**(): `void`

#### Returns

`void`

#### Defined in

[result.ts:174](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L174)

___

### runCatching

▸ `Static` **runCatching**<`T`, `E`\>(`supplier`): [`Result`](Result.md)<`T`, `E`\>

Wrapping actions and return Result instance.
Force the first type parameter type of Error
when the action result catch Error.

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `supplier` | () => `T` | function to be called |

#### Returns

[`Result`](Result.md)<`T`, `E`\>

The result of execution in argument supplier.

#### Defined in

[result.ts:188](https://github.com/simonNozaki/ResultT/blob/978cd38/src/result.ts#L188)
