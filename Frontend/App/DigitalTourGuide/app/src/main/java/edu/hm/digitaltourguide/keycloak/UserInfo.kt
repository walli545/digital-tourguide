package edu.hm.digitaltourguide.keycloak

import com.google.gson.annotations.SerializedName

class UserInfo {

    @SerializedName("preferred_username")
    val username: String? = null

    @SerializedName("sub")
    val sub: String? = null

    @SerializedName("roles")
    val roles: Array<String>? = null
}