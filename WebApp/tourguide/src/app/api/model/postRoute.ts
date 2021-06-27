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


export interface PostRoute { 
    /**
     * Gets or Sets PointOfInterests
     */
    pointOfInterests: Array<string>;
    /**
     * Gets or Sets Name
     */
    name: string;
    /**
     * Gets or Sets Description
     */
    description: string;
    /**
     * Gets or Sets Duration
     */
    duration: number;
    /**
     * Gets or Sets Polyline
     */
    polyline: string;
}

