package edu.hm.digitaltourguide.data.signIn

import edu.hm.digitaltourguide.data.signIn.model.LoggedInUser
import edu.hm.digitaltourguide.keycloak.AccessToken
import edu.hm.digitaltourguide.keycloak.GetDataService
import edu.hm.digitaltourguide.keycloak.RetrofitClientInstance
import java.io.IOException

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
class LoginDataSource {

    fun login(username: String, password: String): Result<LoggedInUser> {
        try {
            val accessToken = getAccessToken(username, password)
            if (accessToken != null){
                val user = LoggedInUser(accessToken, username)
                return Result.Success(user)
            }
            return Result.Error(IOException("Error logging in"))
        } catch (e: Throwable) {
            return Result.Error(IOException("Error logging in", e))
        }
    }

    fun logout() {
        // TODO: revoke authentication
    }


    fun getAccessToken(username: String, password: String): AccessToken? {

        val service: GetDataService =
            RetrofitClientInstance().getRetrofitInstance().create(GetDataService::class.java)

        val call = service.getAccessToken("Login", "password", "3b90413e-db7c-4488-87a1-0bff0eef9d43", "openid", username, password)

        val response = call!!.execute()
        return response.body()
    }

//    fun logoutWithToken(username: String, password: String): AccessToken? {
//
//        val service: GetDataService =
//            RetrofitClientInstance().getRetrofitInstance().create(GetDataService::class.java)
//
//        val call = service.getAccessToken("Login", "password", "3b90413e-db7c-4488-87a1-0bff0eef9d43", "openid", username, password)
//
//        val response = call!!.execute()
//        return response.body()
//    }
}

