package edu.hm.digitaltourguide.data.signIn

/**
 * Class that requests authentication and user information from the remote data source and
 * maintains an in-memory cache of login status and user credentials information.
 */

class RegisterRepository(val dataSource: RegisterDataSource) {


    fun register(username: String, password: String): Result<String> {
        // handle registration
        val result = dataSource.register(username, password)

        return result
    }
}