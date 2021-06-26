package edu.hm.digitaltourguide.keycloak

import com.google.gson.JsonArray
import com.google.gson.JsonObject
import retrofit2.Call
import retrofit2.http.*

interface GetDataService {

    @FormUrlEncoded
    @POST("/auth/realms/tourguide/protocol/openid-connect/token")
    fun getAccessToken(
        @Field("client_id") client_id: String?,
        @Field("grant_type") grant_type: String?,
        @Field("client_secret") client_secret: String?,
        @Field("scope") scope: String?,
        @Field("username") username: String?,
        @Field("password") password: String?
    ): Call<AccessToken?>?

    @FormUrlEncoded
    @POST("/auth/realms/tourguide/protocol/openid-connect/token")
    fun getRefreshedAccessToken(
        @Field("client_id") client_id: String?,
        @Field("grant_type") grant_type: String?,
        @Field("client_secret") client_secret: String?,
        @Field("scope") scope: String?,
        @Field("refresh_token") username: String?
    ): Call<AccessToken?>?


    @FormUrlEncoded
    @POST("/auth/realms/tourguide/protocol/openid-connect/token")
    fun getAdminAccessToken(
        @Field("client_id") client_id: String?,
        @Field("grant_type") grant_type: String?,
        @Field("client_secret") client_secret: String?
    ): Call<AccessToken?>?

    @Headers("Content-Type: application/json")
    @POST("/auth/admin/realms/tourguide/users")
    fun createNewUser(
        @Header("Authorization") auth_header: String,
        @Body body: JsonObject
    ): Call<Void>

    @Headers("Content-Type: application/json")
    @POST("/auth/admin/realms/tourguide/users/{userID}/role-mappings/realm")
    fun setUserRole(
        @Path("userID") userID: String,
        @Header("Authorization") auth_header: String,
        @Body body: JsonArray
    ): Call<Void>

    @FormUrlEncoded
    @POST("/auth/realms/tourguide/protocol/openid-connect/userinfo")
    fun getUserInfo(
        @Field("access_token") access_token: String?
    ): Call<UserInfo?>?

    @FormUrlEncoded
    @POST("/auth/realms/tourguide/protocol/openid-connect/logout")
    fun logoutToken(
        @Field("client_id") client_id: String?,
        @Field("client_secret") client_secret: String?,
        @Field("refresh_token") accessToken: String?
    ): Call<AccessToken?>?
}