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
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';



import { Configuration }                                     from '../configuration';



export interface PromotedServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Get all promoted pois in an area
     * 
     * @param longitudeMin 
     * @param latitudeMin 
     * @param longitudeMax 
     * @param latitudeMax 
     */
    getPromotedPOIS(longitudeMin: number, latitudeMin: number, longitudeMax: number, latitudeMax: number, extraHttpRequestParams?: any): Observable<Array<number>>;

}
