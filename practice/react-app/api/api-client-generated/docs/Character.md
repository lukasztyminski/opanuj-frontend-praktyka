# Character


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The id of the character. | [optional] [default to undefined]
**name** | **string** | The name of the character. | [optional] [default to undefined]
**status** | **string** | The status of the character (Alive, Dead or unknown). | [optional] [default to undefined]
**species** | **string** | The species of the character. | [optional] [default to undefined]
**type** | **string** | The type or subspecies of the character. | [optional] [default to undefined]
**gender** | **string** | The gender of the character. | [optional] [default to undefined]
**origin** | [**CharacterOrigin**](CharacterOrigin.md) |  | [optional] [default to undefined]
**location** | [**CharacterLocation**](CharacterLocation.md) |  | [optional] [default to undefined]
**image** | **string** | Link to the character\&#39;s image. | [optional] [default to undefined]
**episode** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**url** | **string** | Link to the character\&#39;s own URL endpoint. | [optional] [default to undefined]
**created** | **string** | Time at which the character was created in the database. | [optional] [default to undefined]

## Example

```typescript
import { Character } from './api';

const instance: Character = {
    id,
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    image,
    episode,
    url,
    created,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
