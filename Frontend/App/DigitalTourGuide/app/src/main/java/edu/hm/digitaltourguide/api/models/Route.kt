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

import edu.hm.digitaltourguide.api.models.PointOfInterest

import com.squareup.moshi.Json
import android.os.Parcelable
import kotlinx.parcelize.Parcelize


/**
 * 
 * @param routeId Gets or Sets Id
 * @param name Gets or Sets Name
 * @param description Gets or Sets Description
 * @param creatorName Gets or Sets CreatorName
 * @param duration Gets or Sets Duration
 * @param polyline Gets or Sets Polyline
 * @param averageRating Gets or Sets AverageRating
 * @param numberOfRatings Gets or Sets NumberOfRatings
 * @param pointOfInterests The PoIs that are on this route
 */
@Parcelize

data class Route (
    /* Gets or Sets Id */
    @Json(name = "routeId")
    val routeId: java.util.UUID,
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
    val polyline: kotlin.String,
    /* Gets or Sets AverageRating */
    @Json(name = "averageRating")
    val averageRating: kotlin.Double,
    /* Gets or Sets NumberOfRatings */
    @Json(name = "numberOfRatings")
    val numberOfRatings: kotlin.Int,
    /* The PoIs that are on this route */
    @Json(name = "pointOfInterests")
    val pointOfInterests: kotlin.Array<PointOfInterest>? = null
) : Parcelable

