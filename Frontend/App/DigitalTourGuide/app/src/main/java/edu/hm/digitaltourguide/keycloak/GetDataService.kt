package edu.hm.digitaltourguide.keycloak

import retrofit2.Call
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

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
    @POST("/auth/realms/tourguide/protocol/openid-connect/logout")
    fun logoutToken(
        @Field("client_id") client_id: String?,
        @Field("access_token") accessToken: AccessToken?,
        @Field("client_secret") client_secret: String?,
        @Field("scope") scope: String?,
    ): Call<AccessToken?>?
}