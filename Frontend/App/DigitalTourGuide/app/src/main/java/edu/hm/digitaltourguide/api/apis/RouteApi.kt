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

import edu.hm.digitaltourguide.api.models.PostRoute
import edu.hm.digitaltourguide.api.models.ProblemDetails
import edu.hm.digitaltourguide.api.models.PutRoute
import edu.hm.digitaltourguide.api.models.Route

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

class RouteApi(basePath: kotlin.String = defaultBasePath) : ApiClient(basePath) {
    companion object {
        @JvmStatic
        val defaultBasePath: String by lazy {
            System.getProperties().getProperty("edu.hm.digitaltourguide.api.baseUrl", "http://localhost")
        }
    }

    /**
    * Add a new route to the database
    * 
    * @param postRoute  
    * @return Route
    * @throws UnsupportedOperationException If the API returns an informational or redirection response
    * @throws ClientException If the API returns a client error response
    * @throws ServerException If the API returns a server error response
    */
    @Suppress("UNCHECKED_CAST")
    @Throws(UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun addRoute(postRoute: PostRoute) : Route {
        val localVariableConfig = addRouteRequestConfig(postRoute = postRoute)

        val localVarResponse = request<Route>(
            localVariableConfig
        )

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as Route
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
    * To obtain the request config of the operation addRoute
    *
    * @param postRoute  
    * @return RequestConfig
    */
    fun addRouteRequestConfig(postRoute: PostRoute) : RequestConfig {
        val localVariableBody: kotlin.Any? = postRoute
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        
        val localVariableConfig = RequestConfig(
            method = RequestMethod.POST,
            path = "/api/route",
            query = localVariableQuery,
            headers = localVariableHeaders,
            body = localVariableBody
        )

        return localVariableConfig
    }

    /**
    * Deletes the route to a given id
    * 
    * @param routeID  
    * @return void
    * @throws UnsupportedOperationException If the API returns an informational or redirection response
    * @throws ClientException If the API returns a client error response
    * @throws ServerException If the API returns a server error response
    */
    @Throws(UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun deleteRoute(routeID: java.util.UUID) : Unit {
        val localVariableConfig = deleteRouteRequestConfig(routeID = routeID)

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
    * To obtain the request config of the operation deleteRoute
    *
    * @param routeID  
    * @return RequestConfig
    */
    fun deleteRouteRequestConfig(routeID: java.util.UUID) : RequestConfig {
        val localVariableBody: kotlin.Any? = null
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        
        val localVariableConfig = RequestConfig(
            method = RequestMethod.DELETE,
            path = "/api/route/{routeID}".replace("{"+"routeID"+"}", "$routeID"),
            query = localVariableQuery,
            headers = localVariableHeaders,
            body = localVariableBody
        )

        return localVariableConfig
    }

    /**
    * Gets the route to a given id
    * 
    * @param routeID  
    * @return Route
    * @throws UnsupportedOperationException If the API returns an informational or redirection response
    * @throws ClientException If the API returns a client error response
    * @throws ServerException If the API returns a server error response
    */
    @Suppress("UNCHECKED_CAST")
    @Throws(UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun getRoute(routeID: java.util.UUID) : Route {
        val localVariableConfig = getRouteRequestConfig(routeID = routeID)

        val localVarResponse = request<Route>(
            localVariableConfig
        )

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as Route
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
    * To obtain the request config of the operation getRoute
    *
    * @param routeID  
    * @return RequestConfig
    */
    fun getRouteRequestConfig(routeID: java.util.UUID) : RequestConfig {
        val localVariableBody: kotlin.Any? = null
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        
        val localVariableConfig = RequestConfig(
            method = RequestMethod.GET,
            path = "/api/route/{routeID}".replace("{"+"routeID"+"}", "$routeID"),
            query = localVariableQuery,
            headers = localVariableHeaders,
            body = localVariableBody
        )

        return localVariableConfig
    }

    /**
    * Get all routes from the given user
    * 
    * @param userName  
    * @return kotlin.collections.List<Route>
    * @throws UnsupportedOperationException If the API returns an informational or redirection response
    * @throws ClientException If the API returns a client error response
    * @throws ServerException If the API returns a server error response
    */
    @Suppress("UNCHECKED_CAST")
    @Throws(UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun getRoutes(userName: kotlin.String) : kotlin.collections.List<Route> {
        val localVariableConfig = getRoutesRequestConfig(userName = userName)

        val localVarResponse = request<kotlin.collections.List<Route>>(
            localVariableConfig
        )

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as kotlin.collections.List<Route>
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
    * To obtain the request config of the operation getRoutes
    *
    * @param userName  
    * @return RequestConfig
    */
    fun getRoutesRequestConfig(userName: kotlin.String) : RequestConfig {
        val localVariableBody: kotlin.Any? = null
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        
        val localVariableConfig = RequestConfig(
            method = RequestMethod.GET,
            path = "/api/routes/{userName}".replace("{"+"userName"+"}", "$userName"),
            query = localVariableQuery,
            headers = localVariableHeaders,
            body = localVariableBody
        )

        return localVariableConfig
    }

    /**
    * Edits the route to a given id
    * 
    * @param putRoute  
    * @return void
    * @throws UnsupportedOperationException If the API returns an informational or redirection response
    * @throws ClientException If the API returns a client error response
    * @throws ServerException If the API returns a server error response
    */
    @Throws(UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun putRoute(putRoute: PutRoute) : Unit {
        val localVariableConfig = putRouteRequestConfig(putRoute = putRoute)

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
    * To obtain the request config of the operation putRoute
    *
    * @param putRoute  
    * @return RequestConfig
    */
    fun putRouteRequestConfig(putRoute: PutRoute) : RequestConfig {
        val localVariableBody: kotlin.Any? = putRoute
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        
        val localVariableConfig = RequestConfig(
            method = RequestMethod.PUT,
            path = "/api/route",
            query = localVariableQuery,
            headers = localVariableHeaders,
            body = localVariableBody
        )

        return localVariableConfig
    }

}
