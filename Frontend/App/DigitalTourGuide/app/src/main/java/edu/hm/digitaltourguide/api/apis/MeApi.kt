/**
* API
* API Spec f�r den digitalen Reisef�hrer
*
* The version of the OpenAPI document: v1
* 
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit the class manually.
*/
package edu.hm.digitaltourguide.api.apis

import edu.hm.digitaltourguide.api.models.Me

import edu.hm.digitaltourguide.api.infrastructure.ApiClient
import edu.hm.digitaltourguide.api.infrastructure.ClientException
import edu.hm.digitaltourguide.api.infrastructure.ClientError
import edu.hm.digitaltourguide.api.infrastructure.ServerException
import edu.hm.digitaltourguide.api.infrastructure.ServerError
import edu.hm.digitaltourguide.api.infrastructure.MultiValueMap
import edu.hm.digitaltourguide.api.infrastructure.RequestConfig
import edu.hm.digitaltourguide.api.infrastructure.RequestMethod
import edu.hm.digitaltourguide.api.infrastructure.ResponseType
import edu.hm.digitaltourguide.api.infrastructure.Success
import edu.hm.digitaltourguide.api.infrastructure.toMultiValue

class MeApi(basePath: kotlin.String = defaultBasePath) : ApiClient(basePath) {
    companion object {
        @JvmStatic
        val defaultBasePath: String by lazy {
            System.getProperties().getProperty("edu.hm.digitaltourguide.api.baseUrl", "http://localhost")
        }
    }

    /**
    * Return 200 ok.
    * 
    * @return Me
    * @throws UnsupportedOperationException If the API returns an informational or redirection response
    * @throws ClientException If the API returns a client error response
    * @throws ServerException If the API returns a server error response
    */
    @Suppress("UNCHECKED_CAST")
    @Throws(UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun getMe() : Me {
        val localVariableConfig = getMeRequestConfig()

        val localVarResponse = request<Me>(
            localVariableConfig
        )

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as Me
            ResponseType.Informational -> throw UnsupportedOperationException("Client does not support Informational responses.")
            ResponseType.Redirection -> throw UnsupportedOperationException("Client does not support Redirection responses.")
            ResponseType.ClientError -> {
                val localVarError = localVarResponse as ClientError<*>
                throw ClientException("Client error : ${localVarError.statusCode} ${localVarError.message.orEmpty()}", localVarError.statusCode, localVarResponse)
            }
            ResponseType.ServerError -> {
                val localVarError = localVarResponse as ServerError<*>
                throw ServerException("Server error : ${localVarError.statusCode} ${localVarError.message.orEmpty()}", localVarError.statusCode, localVarResponse)
            }
        }
    }

    /**
    * To obtain the request config of the operation getMe
    *
    * @return RequestConfig
    */
    fun getMeRequestConfig() : RequestConfig {
        val localVariableBody: kotlin.Any? = null
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        
        val localVariableConfig = RequestConfig(
            method = RequestMethod.GET,
            path = "/api/me",
            query = localVariableQuery,
            headers = localVariableHeaders,
            body = localVariableBody
        )

        return localVariableConfig
    }

}
