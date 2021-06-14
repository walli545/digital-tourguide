package edu.hm.digitaltourguide.keycloak

import com.google.gson.annotations.SerializedName

class AccessToken {

    @SerializedName("access_token")
    private val accessToken: String? = null

    @SerializedName("expires_in")
    private val expiresIn: String? = null

    @SerializedName("refresh_expires_in")
    private val refreshExpiresIn: String? = null

    @SerializedName("refresh_token")
    private val refreshToken: String? = null

    @SerializedName("token_type")
    private val tokenType: String? = null

    @SerializedName("id_token")
    private val idToken: String? = null

    @SerializedName("not-before-policy")
    private val notBeforePolicy: String? = null

    @SerializedName("session_state")
    private val sessionState: String? = null

    @SerializedName("scope")
    private val scope: String? = null
}