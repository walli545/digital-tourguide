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
 * Model class for a centerResult
 * @param latitude Gets or Sets Latitude
 * @param longitude Gets or Sets Longitude
 */
@Parcelize

data class CenterResult (
    /* Gets or Sets Latitude */
    @Json(name = "latitude")
    val latitude: kotlin.Double,
    /* Gets or Sets Longitude */
    @Json(name = "longitude")
    val longitude: kotlin.Double
) : Parcelable

