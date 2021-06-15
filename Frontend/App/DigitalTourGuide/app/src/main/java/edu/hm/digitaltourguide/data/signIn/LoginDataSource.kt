package edu.hm.digitaltourguide.data.signIn

import edu.hm.digitaltourguide.MainActivity
import edu.hm.digitaltourguide.data.signIn.model.LoggedInUser
import edu.hm.digitaltourguide.keycloak.AccessToken
import edu.hm.digitaltourguide.keycloak.GetDataService
import edu.hm.digitaltourguide.keycloak.RetrofitClientInstance
import java.io.IOException


/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
class LoginDataSource {

    val LOGIN_CLIENT = "Login"
    val LOGIN_CLIENT_SECRET = "3b90413e-db7c-4488-87a1-0bff0eef9d43"
    val LOGIN_CLIENT_GRAND_TYPE = "password"
    val LOGIN_CLIENT_SCOPE = "openid"

    fun login(username: String, password: String): Result<LoggedInUser> {
        try {
            val accessToken = getAccessToken(username, password)
            if (accessToken != null){
                val user = LoggedInUser(accessToken, username, getUserRoles(accessToken.accessToken))
                return Result.Success(user)
            }
            return Result.Error(IOException("Error logging in"))
        } catch (e: Throwable) {
            return Result.Error(IOException("Error logging in", e))
        }
    }

    fun logout() {
        logoutWithToken()
    }

    fun getAccessToken(username: String, password: String): AccessToken? {

        val service: GetDataService =
            RetrofitClientInstance().getRetrofitInstance().create(GetDataService::class.java)

        val call = service.getAccessToken(LOGIN_CLIENT, LOGIN_CLIENT_GRAND_TYPE, LOGIN_CLIENT_SECRET, LOGIN_CLIENT_SCOPE, username, password)

        val response = call!!.execute()
        return response.body()
    }

    fun getNewAccessToken(username: String, password: String): AccessToken? {

        val service: GetDataService =
            RetrofitClientInstance().getRetrofitInstance().create(GetDataService::class.java)

        val refreshToken = MainActivity.preferences.getString("REFRESH_TOKEN", null)

        val call = service.getRefreshedAccessToken(LOGIN_CLIENT, LOGIN_CLIENT_GRAND_TYPE, LOGIN_CLIENT_SECRET, LOGIN_CLIENT_SCOPE, refreshToken)

        val response = call!!.execute()
        return response.body()
    }

    fun getUserRoles(accessToken: String?): Array<String> {

        val service: GetDataService =
            RetrofitClientInstance().getRetrofitInstance().create(GetDataService::class.java)

        val call = service.getUserInfo(accessToken)

        val response = call!!.execute()
        return response.body()?.roles!!
    }

    fun logoutWithToken(): AccessToken? {

        val service: GetDataService =
            RetrofitClientInstance().getRetrofitInstance().create(GetDataService::class.java)

        val pref = MainActivity.preferences
        val token = pref.getString("REFRESH_TOKEN", null)

        val call = service.logoutToken(LOGIN_CLIENT, LOGIN_CLIENT_SECRET, token)

        val response = call!!.execute()
        return response.body()
    }
}

class BodyData internal constructor(val username: String, val enabled: String)

