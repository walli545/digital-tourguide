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

  addPOI(
    poi: PostPointOfInterest,
    extraHttpRequestParams?: any
  ): Observable<PointOfInterest> {
    const newPoi = {
      id: `${this.currentId}`,
      ...poi,
      averageRating: 3,
      numberOfRatings: 10,
    };
    this.pois.set(this.currentId, newPoi);
    this.currentId++;
    return of(newPoi);
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

  getPOIs(
    userName: string,
    extraHttpRequestParams?: any
  ): Observable<Array<number>> {
    throw new Error('Not implemented');
  }

  putPOI(
    poiID: number,
    poi: PostPointOfInterest,
    extraHttpRequestParams?: any
  ): Observable<PointOfInterest> {
    if (this.pois.has(poiID)) {
      const updated = {
        id: `${poiID}`,
        ...poi,
        averageRating: 3,
        numberOfRatings: 10,
      };
      this.pois.set(poiID, updated);
      return of(updated);
    } else {
      return throwError('not found');
    }
  }
}
