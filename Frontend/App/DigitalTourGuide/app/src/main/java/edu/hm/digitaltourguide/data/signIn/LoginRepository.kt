package edu.hm.digitaltourguide.data.signIn

import edu.hm.digitaltourguide.MainActivity
import edu.hm.digitaltourguide.data.signIn.model.LoggedInUser

/**
 * Class that requests authentication and user information from the remote data source and
 * maintains an in-memory cache of login status and user credentials information.
 */



class LoginRepository(val dataSource: LoginDataSource) {


    // in-memory cache of the loggedInUser object
    var user: LoggedInUser? = null
        private set

    val isLoggedIn: Boolean
        get() = user != null

    init {
        // If user credentials will be cached in local storage, it is recommended it be encrypted
        // @see https://developer.android.com/training/articles/keystore
        user = null
    }

    fun logout() {
        //MainActivity.preferences.getString()
        user = null
        dataSource.logout()

        val editor = MainActivity.preferences.edit()
        editor.apply{
            putString("USERNAME", null)
            putString("ACCESS_TOKEN", null)
            putString("ACCESS_TOKEN_EXPIRES_IN", null)
            putString("REFRESH_TOKEN", null)
            putString("REFRESH_TOKEN_EXPIRES_IN", null)
            putString("SCOPE", null)
            putString("SESSION_STATE", null)
        }.apply()
    }

    fun login(username: String, password: String): Result<LoggedInUser> {
        // handle login
        val result = dataSource.login(username, password)

        if (result is Result.Success) {
            setLoggedInUser(result.data)
        }

        return result
    }

    private fun setLoggedInUser(loggedInUser: LoggedInUser) {
        val editor = MainActivity.preferences.edit()
        editor.apply{
            putString("USERNAME", loggedInUser.displayName)
            putString("ACCESS_TOKEN", loggedInUser.accessToken.accessToken)
            putString("ACCESS_TOKEN_EXPIRES_IN", loggedInUser.accessToken.expiresIn)
            putString("REFRESH_TOKEN", loggedInUser.accessToken.refreshToken)
            putString("REFRESH_TOKEN_EXPIRES_IN", loggedInUser.accessToken.refreshExpiresIn)
            putString("SCOPE", loggedInUser.accessToken.scope)
            putString("SESSION_STATE", loggedInUser.accessToken.sessionState)
            putStringSet("ROLES", HashSet(loggedInUser.roles?.asList()))
        }.apply()


        this.user = loggedInUser
        // If user credentials will be cached in local storage, it is recommended it be encrypted
        // @see https://developer.android.com/training/articles/keystore
    }
}