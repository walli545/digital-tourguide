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
import { PointOfInterest } from './pointOfInterest';


export interface Route { 
    id: string;
    pointOfInterests: Array<PointOfInterest>;
    name: string;
    description: string;
    creatorName: string;
    duration: number;
    polyline: string;
}

