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
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { InlineResponse200, PointOfInterest } from '../model/models';
import { PostPointOfInterest } from '../model/models';
import { ProblemDetails } from '../model/models';
import { PutPointOfInterest } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface PointOfInterestServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Add a new poi to the database
     * 
     * @param postPointOfInterest 
     */
    addPOI(postPointOfInterest: PostPointOfInterest, extraHttpRequestParams?: any): Observable<PointOfInterest>;

    /**
     * Deletes the poi to a given id
     * 
     * @param poiID the poiID to delete
     */
    deletePOI(poiID: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * Get the center of all poi\&#39;s from the given user
     * 
     * @param userName 
     */
    getCenterOfPOIs(userName: string, extraHttpRequestParams?: any): Observable<InlineResponse200>;

    /**
     * Gets the poi to a given id
     * 
     * @param poiID 
     */
    getPOI(poiID: string, extraHttpRequestParams?: any): Observable<PointOfInterest>;

    /**
     * Get all poi\&#39;s from the given user
     * 
     * @param userName 
     */
    getPOIs(userName: string, extraHttpRequestParams?: any): Observable<Array<PointOfInterest>>;

    /**
     * Edits the poi to a given id
     * 
     * @param putPointOfInterest 
     */
    putPOI(putPointOfInterest: PutPointOfInterest, extraHttpRequestParams?: any): Observable<{}>;

}
