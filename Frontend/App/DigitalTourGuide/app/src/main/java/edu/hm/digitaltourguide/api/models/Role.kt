/**
* API
* API Spec f�r den digitalen Reisef�hrer
*
* The version of the OpenAPI document: v1
* 
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit the class manually.
*/
package edu.hm.digitaltourguide.api.models


import com.squareup.moshi.Json

/**
* Gets or Sets Role
* Values: contentMinusCreator,moderator,admin,promoter
*/

enum class Role(val value: kotlin.String) {


    @Json(name = "content-creator")
    contentMinusCreator("content-creator"),

    @Json(name = "moderator")
    moderator("moderator"),

    @Json(name = "admin")
    admin("admin"),

    @Json(name = "promoter")
    promoter("promoter");


    /**
    This override toString avoids using the enum var name and uses the actual api value instead.
    In cases the var name and value are different, the client would send incorrect enums to the server.
    **/
    override fun toString(): String {
        return value
    }
}

