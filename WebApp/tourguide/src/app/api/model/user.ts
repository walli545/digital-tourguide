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


export interface User { 
    userName: string;
    role: User.RoleEnum;
}
export namespace User {
    export type RoleEnum = 'ContentCreator' | 'Admin' | 'Moderator' | 'Tourist' | 'Advertiser';
    export const RoleEnum = {
        ContentCreator: 'ContentCreator' as RoleEnum,
        Admin: 'Admin' as RoleEnum,
        Moderator: 'Moderator' as RoleEnum,
        Tourist: 'Tourist' as RoleEnum,
        Advertiser: 'Advertiser' as RoleEnum
    };
}

