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
import { PointOfInterest } from './pointOfInterest';


export interface Route { 
    /**
     * Gets or Sets Id
     */
    routeId: string;
    /**
     * The PoIs that are on this route
     */
    pointOfInterests?: Array<PointOfInterest> | null;
    /**
     * Gets or Sets Name
     */
    name: string;
    /**
     * Gets or Sets Description
     */
    description: string;
    /**
     * Gets or Sets CreatorName
     */
    creatorName: string;
    /**
     * Gets or Sets Duration
     */
    duration: number;
    /**
     * Gets or Sets Polyline
     */
    polyline: string;
}

