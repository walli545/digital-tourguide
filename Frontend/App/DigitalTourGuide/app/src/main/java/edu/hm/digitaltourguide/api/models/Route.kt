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

import edu.hm.digitaltourguide.api.models.PointOfInterest

import com.squareup.moshi.Json

/**
 * 
 * @param id 
 * @param pointOfInterests 
 * @param name 
 * @param description 
 * @param creatorName 
 * @param duration 
 * @param polyline 
 */

data class Route (
    @Json(name = "id")
    val id: kotlin.String,
    @Json(name = "pointOfInterests")
    val pointOfInterests: kotlin.collections.List<PointOfInterest>,
    @Json(name = "name")
    val name: kotlin.String,
    @Json(name = "description")
    val description: kotlin.String,
    @Json(name = "creatorName")
    val creatorName: kotlin.String,
    @Json(name = "duration")
    val duration: kotlin.Float,
    @Json(name = "polyline")
    val polyline: kotlin.String
)
