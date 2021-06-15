package edu.hm.digitaltourguide.data.signIn

import com.google.gson.JsonArray
import com.google.gson.JsonObject
import edu.hm.digitaltourguide.keycloak.GetDataService
import edu.hm.digitaltourguide.keycloak.RetrofitClientInstance
import java.io.IOException

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
class RegisterDataSource {

    fun register(username: String, password: String): Result<String> {
        try {
            if (createNewUser(username, password))
                return Result.Success("Sign up successful")
            return Result.Error(IOException("Sign up failed"))
        } catch (e: Throwable) {
            return Result.Error(IOException("Sign up error", e))
        }
    }

    fun createNewUser(username: String, password: String): Boolean {

        val service: GetDataService =
            RetrofitClientInstance().getRetrofitInstance().create(GetDataService::class.java)

        // Request admin access token
        val call = service.getAdminAccessToken("admin-cli", "client_credentials", "4d69abf9-fcb4-4b09-9ba9-1f3a262a678a")
        val response2 = call!!.execute()
        val accessToken = response2.body()!!.accessToken

        //"enabled":"true","credentials":[{"type":"password","value":"test123","temporary":false}]}'

        val credentialsArray = JsonArray()
        val credentials = JsonObject()
        credentials.addProperty("type", "password")
        credentials.addProperty("value", password)
        credentials.addProperty("temporary", false)
        credentialsArray.add(credentials)

        val bodyData = JsonObject()
        bodyData.addProperty("username", username)
        bodyData.add("credentials", credentialsArray)
        bodyData.addProperty("enabled", "true")

        // Create new user
        val call2 = service.createNewUser("Bearer " + accessToken, bodyData)
        val response = call2!!.execute().isSuccessful

        return response
    }
}