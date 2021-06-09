/**
* Digitaler Reiseführer
* REST Api für den digitalen Reiseführer.
*
* The version of the OpenAPI document: 1.0.0
* 
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit the class manually.
*/
package edu.hm.digitaltourguide.api.models


import com.squareup.moshi.Json

/**
 * 
 * @param content 
 * @param rating 
 * @param userName 
 */

data class Review (
    @Json(name = "content")
    val content: kotlin.String,
    @Json(name = "rating")
    val rating: kotlin.Float,
    @Json(name = "userName")
    val userName: kotlin.String
)
