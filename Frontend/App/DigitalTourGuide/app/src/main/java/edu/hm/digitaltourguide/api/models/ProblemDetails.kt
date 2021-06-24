/**
* API
* API Spec fuer den digitalen Reisefuehrer
*
* The version of the OpenAPI document: v1
* 
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit the class manually.
*/
package edu.hm.digitaltourguide.api.models

import edu.hm.digitaltourguide.api.models.AnyType

import com.squareup.moshi.Json
import android.os.Parcelable
import kotlinx.parcelize.Parcelize


/**
 * 
 * @param type 
 * @param title 
 * @param status 
 * @param detail 
 * @param instance 
 */
@Parcelize

data class ProblemDetails (
    @Json(name = "type")
    val type: kotlin.String? = null,
    @Json(name = "title")
    val title: kotlin.String? = null,
    @Json(name = "status")
    val status: kotlin.Int? = null,
    @Json(name = "detail")
    val detail: kotlin.String? = null,
    @Json(name = "instance")
    val instance: kotlin.String? = null
) : kotlin.collections.HashMap<String, AnyType>(), Parcelable

class AnyType {

}

