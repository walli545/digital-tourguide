package edu.hm.digitaltourguide.data.signIn

import java.io.IOException

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
class RegisterDataSource {

    fun register(username: String, password: String): Result<String> {
        try {
            // TODO: handle registerUser process
            // val fakeUser = LoggedInUser(java.util.UUID.randomUUID().toString(), username)
            return Result.Success("Sign up successful")
        } catch (e: Throwable) {
            return Result.Error(IOException("Sign up error", e))
        }
    }

    fun logout() {
        // TODO: revoke authentication
    }
}