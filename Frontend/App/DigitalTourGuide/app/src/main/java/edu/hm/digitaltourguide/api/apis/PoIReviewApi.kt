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

import edu.hm.digitaltourguide.api.models.PoIReview
import edu.hm.digitaltourguide.api.models.PostPoIReview
import edu.hm.digitaltourguide.api.models.ProblemDetails

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

class PoIReviewApi(basePath: kotlin.String = defaultBasePath) : ApiClient(basePath) {
    companion object {
        @JvmStatic
        val defaultBasePath: String by lazy {
            System.getProperties().getProperty("edu.hm.digitaltourguide.api.baseUrl", "http://localhost")
        }
    }

    /**
    * Add a new review for a poi
    * 
    * @param postPoIReview  
    * @return void
    * @throws UnsupportedOperationException If the API returns an informational or redirection response
    * @throws ClientException If the API returns a client error response
    * @throws ServerException If the API returns a server error response
    */
    @Throws(UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun addPoIReview(postPoIReview: PostPoIReview) : Unit {
        val localVariableConfig = addPoIReviewRequestConfig(postPoIReview = postPoIReview)

        val localVarResponse = request<Any?>(
            localVariableConfig
        )

        return when (localVarResponse.responseType) {
            ResponseType.Success -> Unit
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
    * To obtain the request config of the operation addPoIReview
    *
    * @param postPoIReview  
    * @return RequestConfig
    */
    fun addPoIReviewRequestConfig(postPoIReview: PostPoIReview) : RequestConfig {
        val localVariableBody: kotlin.Any? = postPoIReview
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        
        val localVariableConfig = RequestConfig(
            method = RequestMethod.POST,
            path = "/api/poireview",
            query = localVariableQuery,
            headers = localVariableHeaders,
            body = localVariableBody
        )

        return localVariableConfig
    }

    /**
    * Deletes the given review.
    * 
    * @param poiId The id from the review to delete 
    * @return void
    * @throws UnsupportedOperationException If the API returns an informational or redirection response
    * @throws ClientException If the API returns a client error response
    * @throws ServerException If the API returns a server error response
    */
    @Throws(UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun deletePoIReview(poiId: java.util.UUID) : Unit {
        val localVariableConfig = deletePoIReviewRequestConfig(poiId = poiId)

        val localVarResponse = request<Any?>(
            localVariableConfig
        )

        return when (localVarResponse.responseType) {
            ResponseType.Success -> Unit
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
    * To obtain the request config of the operation deletePoIReview
    *
    * @param poiId The id from the review to delete 
    * @return RequestConfig
    */
    fun deletePoIReviewRequestConfig(poiId: java.util.UUID) : RequestConfig {
        val localVariableBody: kotlin.Any? = null
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        
        val localVariableConfig = RequestConfig(
            method = RequestMethod.DELETE,
            path = "/api/poireview/{poiId}".replace("{"+"poiId"+"}", "$poiId"),
            query = localVariableQuery,
            headers = localVariableHeaders,
            body = localVariableBody
        )

        return localVariableConfig
    }

    /**
    * Gets all reviews for the given poi
    * 
    * @param poiId The id from the poi 
    * @return kotlin.Array<PoIReview>
    * @throws UnsupportedOperationException If the API returns an informational or redirection response
    * @throws ClientException If the API returns a client error response
    * @throws ServerException If the API returns a server error response
    */
    @Suppress("UNCHECKED_CAST")
    @Throws(UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun getPoIReviews(poiId: java.util.UUID) : kotlin.Array<PoIReview> {
        val localVariableConfig = getPoIReviewsRequestConfig(poiId = poiId)

        val localVarResponse = request<kotlin.Array<PoIReview>>(
            localVariableConfig
        )

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as kotlin.Array<PoIReview>
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
    * To obtain the request config of the operation getPoIReviews
    *
    * @param poiId The id from the poi 
    * @return RequestConfig
    */
    fun getPoIReviewsRequestConfig(poiId: java.util.UUID) : RequestConfig {
        val localVariableBody: kotlin.Any? = null
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        
        val localVariableConfig = RequestConfig(
            method = RequestMethod.GET,
            path = "/api/poireview/{poiId}".replace("{"+"poiId"+"}", "$poiId"),
            query = localVariableQuery,
            headers = localVariableHeaders,
            body = localVariableBody
        )

        return localVariableConfig
    }

}
