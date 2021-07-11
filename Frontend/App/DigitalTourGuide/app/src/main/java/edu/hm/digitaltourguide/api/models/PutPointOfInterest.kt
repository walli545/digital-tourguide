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
import android.os.Parcelable
import kotlinx.parcelize.Parcelize


/**
 * 
 * @param id Gets or Sets Id
 * @param name Gets or Sets Name
 * @param description Gets or Sets Description
 * @param latitude Gets or Sets Latitude
 * @param longitude Gets or Sets Longitude
 * @param imageUrl Gets or Sets ImageUrl
 */
@Parcelize

data class PutPointOfInterest (
    /* Gets or Sets Id */
    @Json(name = "id")
    val id: kotlin.String,
    /* Gets or Sets Name */
    @Json(name = "name")
    val name: kotlin.String,
    /* Gets or Sets Description */
    @Json(name = "description")
    val description: kotlin.String,
    /* Gets or Sets Latitude */
    @Json(name = "latitude")
    val latitude: kotlin.Double,
    /* Gets or Sets Longitude */
    @Json(name = "longitude")
    val longitude: kotlin.Double,
    /* Gets or Sets ImageUrl */
    @Json(name = "imageUrl")
    val imageUrl: kotlin.String
) : Parcelable
