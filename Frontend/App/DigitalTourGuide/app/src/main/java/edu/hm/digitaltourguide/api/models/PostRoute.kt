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
 * 
 * @param pointOfInterests Gets or Sets PointOfInterests
 * @param name Gets or Sets Name
 * @param description Gets or Sets Description
 * @param creatorName Gets or Sets CreatorName
 * @param duration Gets or Sets Duration
 * @param polyline Gets or Sets Polyline
 */

data class PostRoute (
    /* Gets or Sets PointOfInterests */
    @Json(name = "pointOfInterests")
    val pointOfInterests: kotlin.collections.List<java.util.UUID>,
    /* Gets or Sets Name */
    @Json(name = "name")
    val name: kotlin.String,
    /* Gets or Sets Description */
    @Json(name = "description")
    val description: kotlin.String,
    /* Gets or Sets CreatorName */
    @Json(name = "creatorName")
    val creatorName: kotlin.String,
    /* Gets or Sets Duration */
    @Json(name = "duration")
    val duration: kotlin.Float,
    /* Gets or Sets Polyline */
    @Json(name = "polyline")
    val polyline: kotlin.String
)

