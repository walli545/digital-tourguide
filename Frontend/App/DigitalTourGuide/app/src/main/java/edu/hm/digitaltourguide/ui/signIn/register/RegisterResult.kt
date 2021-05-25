package edu.hm.digitaltourguide.ui.signIn.register

/**
 * Authentication result : success (user details) or error message.
 */
data class RegisterResult(
    val success: Int? = null,
    val error: Int? = null
)