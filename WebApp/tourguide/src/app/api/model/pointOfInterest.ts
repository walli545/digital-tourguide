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


/**
 * Model class for a PointOfInterest
 */
export interface PointOfInterest { 
    /**
     * Gets or Sets Id
     */
    poIID: string;
    /**
     * Gets or Sets Name
     */
    name: string;
    /**
     * Gets or Sets username
     */
    userName: string;
    /**
     * Gets or Sets Description
     */
    description: string;
    /**
     * Gets or Sets Latitude
     */
    latitude: number;
    /**
     * Gets or Sets Longitude
     */
    longitude: number;
    /**
     * Gets or Sets AverageRating
     */
    averageRating: number;
    /**
     * Gets or Sets NumberOfRatings
     */
    numberOfRatings: number;
    /**
     * Gets or Sets ImageUrl
     */
    imageUrl: string;
    /**
     * Defines, whether this poi is promoted or not
     */
    isPromoted: boolean;
}

