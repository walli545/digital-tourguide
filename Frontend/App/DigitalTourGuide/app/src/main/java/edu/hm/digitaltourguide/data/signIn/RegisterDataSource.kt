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

    val ADMIN_CLIENT = "admin-cli"
    val ADMIN_CLIENT_SECRET = "4d69abf9-fcb4-4b09-9ba9-1f3a262a678a"
    val ADMIN_CLIENT_GRAND_TYPE = "client_credentials"
    val ROLE_NAME = "user"
    val ROLE_ID = "96b0f359-1c08-4b21-8029-edc37e5103ec"

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
        val call = service.getAdminAccessToken(ADMIN_CLIENT, ADMIN_CLIENT_GRAND_TYPE, ADMIN_CLIENT_SECRET)
        val response2 = call!!.execute()
        val accessToken = response2.body()!!.accessToken

        // Create credentials for new user
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
        val responseCreateUser = call2!!.execute()

        // get user id from response header
        val userID = responseCreateUser.headers().get("Location")?.split("/")?.last()

        val rolesArray = JsonArray()
        val bodyDataRole = JsonObject()
        bodyDataRole.addProperty("id", ROLE_ID)
        bodyDataRole.addProperty("name", ROLE_NAME)
        rolesArray.add(bodyDataRole)

        val call3 = service.setUserRole(userID!!, "Bearer " + accessToken, rolesArray)
        val responseSetRole = call3!!.execute()

        return responseCreateUser.isSuccessful
    }
}