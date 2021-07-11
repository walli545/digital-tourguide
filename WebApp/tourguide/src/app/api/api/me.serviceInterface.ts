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
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { Me } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface MeServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Return 200 ok.
     * 
     */
    getMe(extraHttpRequestParams?: any): Observable<Me>;

}