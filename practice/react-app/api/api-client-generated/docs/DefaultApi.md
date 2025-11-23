# DefaultApi

All URIs are relative to *https://rickandmortyapi.com/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getCharacters**](#getcharacters) | **GET** /character | Get a list of characters|

# **getCharacters**
> CharacterListResponse getCharacters()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.getCharacters();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CharacterListResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of characters |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

