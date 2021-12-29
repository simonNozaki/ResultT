[type-result](../README.md) / [Exports](../modules.md) / Result

# Class: Result<T, E\>

Base class for runtime result.
This class may express the context for a runtime and its result. <br>
Highly inspired by Kotlin Result/runCatching.

**`see`** usage ... test/appliation/result-test.ts

**`see`** [https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/)

## Type parameters

| Name |
| :------ |
| `T` |
| `E` |

## Table of contents

### Constructors

- [constructor](Result.md#constructor)

### Properties

- [DEFAULT\_ERROR\_MESSAGE](Result.md#default_error_message)
- [\_errors](Result.md#_errors)
- [\_value](Result.md#_value)
- [Failure](Result.md#failure)

### Accessors

- [errors](Result.md#errors)

### Methods

- [addError](Result.md#adderror)
- [fold](Result.md#fold)
- [getOrElse](Result.md#getorelse)
- [getOrThrow](Result.md#getorthrow)
- [isError](Result.md#iserror)
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

result.ts:29

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

result.ts:30

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

result.ts:31

## Properties

### DEFAULT\_ERROR\_MESSAGE

• `Private` `Readonly` **DEFAULT\_ERROR\_MESSAGE**: ``"Unexpcted error be thrown on applying operator"``

#### Defined in

result.ts:19

___

### \_errors

• `Private` `Readonly` **\_errors**: `E`[]

error message or strings

#### Defined in

result.ts:16

___

### \_value

• `Private` `Readonly` **\_value**: `Option`<`T`\>

Successed data of this object

#### Defined in

result.ts:18

___

### Failure

▪ `Static` `Private` **Failure**: typeof `__class`

Result of failure. This class is instanciated on catching an error

#### Defined in

result.ts:181

## Accessors

### errors

• `get` **errors**(): `List`<`E`\>

Get errors as immutbale list

#### Returns

`List`<`E`\>

#### Defined in

result.ts:25

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

result.ts:48

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

result.ts:108

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

result.ts:161

___

### getOrThrow

▸ **getOrThrow**(`e?`): `T`

Get a value of this result or throw error if not

#### Parameters

| Name | Type |
| :------ | :------ |
| `e?` | `Error` |

#### Returns

`T`

#### Defined in

result.ts:146

___

### isError

▸ `Private` **isError**(`arg`): arg is Error

Check and force compiler to identify value as Error instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `unknown` |

#### Returns

arg is Error

#### Defined in

result.ts:201

___

### isFailure

▸ **isFailure**(): `boolean`

Return true if the result was failed.

#### Returns

`boolean`

#### Defined in

result.ts:57

___

### isSuccess

▸ **isSuccess**(): `boolean`

Return true if the result was successed.

#### Returns

`boolean`

#### Defined in

result.ts:65

___

### map

▸ **map**<`R`\>(`transform`): [`Result`](Result.md)<`any`, `E`\>

Map the result to another result, transforming by the argument.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `transform` | (`arg?`: `T`) => `R` |

#### Returns

[`Result`](Result.md)<`any`, `E`\>

#### Defined in

result.ts:128

___

### onFailure

▸ **onFailure**(`message?`, `consumer?`): [`Result`](Result.md)<`T`, `E`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `E` |
| `consumer?` | (`it?`: `Error`) => `void` |

#### Returns

[`Result`](Result.md)<`T`, `E`\>

#### Defined in

result.ts:74

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

result.ts:93

___

### throwOnFailure

▸ `Private` **throwOnFailure**(): `void`

#### Returns

`void`

#### Defined in

result.ts:171

___

### runCatching

▸ `Static` **runCatching**<`T`, `E`\>(`supplier`): [`Result`](Result.md)<`any`, `any`\>

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

[`Result`](Result.md)<`any`, `any`\>

#### Defined in

result.ts:212
