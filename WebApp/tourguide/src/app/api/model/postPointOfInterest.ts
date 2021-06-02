/**
 * API
 * API Spec für den digitalen Reiseführer
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * Model class for posting a new poi
 */
export interface PostPointOfInterest { 
    /**
     * Gets or Sets Name
     */
    name: string;
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
     * Gets or Sets ImageUrl
     */
    imageUrl: string;
}

