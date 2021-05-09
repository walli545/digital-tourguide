import { HttpHeaders, HttpParameterCodec } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  Configuration,
  PointOfInterest,
  PointOfInterestServiceInterface,
  PostPointOfInterest,
} from '../../api';

export class PointOfInterestServiceMock
  implements PointOfInterestServiceInterface {
  public defaultHeaders!: HttpHeaders;
  public configuration!: Configuration;
  public encoder!: HttpParameterCodec;

  private pois = new Map<Number, PointOfInterest>();
  private currentId = 0;

  addpoi(
    route: PostPointOfInterest,
    extraHttpRequestParams?: any
  ): Observable<{}> {
    this.pois.set(this.currentId, {
      id: this.currentId,
      ...route,
    });
    this.currentId++;
    return of();
  }

  deletePOI(poiID: number, extraHttpRequestParams?: any): Observable<{}> {
    if (this.pois.has(poiID)) {
      this.pois.delete(poiID);
      return of();
    } else {
      return throwError('not found');
    }
  }

  getPOI(
    poiID: number,
    extraHttpRequestParams?: any
  ): Observable<PointOfInterest> {
    if (this.pois.has(poiID)) {
      return of(this.pois.get(poiID)!);
    } else {
      return throwError('not found');
    }
  }

  getPois(
    userName: string,
    extraHttpRequestParams?: any
  ): Observable<Array<number>> {
    throw new Error('Not implemented');
  }

  putPOI(
    poiID: number,
    route: PostPointOfInterest,
    extraHttpRequestParams?: any
  ): Observable<{}> {
    if (this.pois.has(poiID)) {
      this.pois.set(poiID, {
        id: poiID,
        ...route,
      });
      return of();
    } else {
      return throwError('not found');
    }
  }
}
