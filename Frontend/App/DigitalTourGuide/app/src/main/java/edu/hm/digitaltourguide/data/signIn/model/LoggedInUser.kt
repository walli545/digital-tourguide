package edu.hm.digitaltourguide.data.signIn.model

import edu.hm.digitaltourguide.keycloak.AccessToken

/**
 * Data class that captures user information for logged in users retrieved from LoginRepository
 */
data class LoggedInUser(
    val accessToken: AccessToken,
    //val userId: String,
    val displayName: String
)