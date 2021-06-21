package edu.hm.digitaltourguide.keycloak

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

public class RetrofitClientInstance {

    var retrofit: Retrofit? = null
    val BASE_URL = "http:/10.0.2.2:8080"

    public fun getRetrofitInstance() : Retrofit {
        if (retrofit == null){
            retrofit = retrofit2.Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
        }
        return retrofit!!
    }
}