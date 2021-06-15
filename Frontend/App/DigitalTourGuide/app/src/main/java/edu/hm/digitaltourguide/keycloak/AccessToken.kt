package edu.hm.digitaltourguide.keycloak

import com.google.gson.annotations.SerializedName

class AccessToken {

    @SerializedName("access_token")
    val accessToken: String? = null

    @SerializedName("expires_in")
    val expiresIn: String? = null

    @SerializedName("refresh_expires_in")
    val refreshExpiresIn: String? = null

    @SerializedName("refresh_token")
    val refreshToken: String? = null

    @SerializedName("token_type")
    val tokenType: String? = null

    @SerializedName("id_token")
    val idToken: String? = null

    @SerializedName("not-before-policy")
    val notBeforePolicy: String? = null

    @SerializedName("session_state")
    val sessionState: String? = null

    @SerializedName("scope")
    val scope: String? = null
}