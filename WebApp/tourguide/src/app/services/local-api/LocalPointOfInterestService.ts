import {
  HttpErrorResponse,
  HttpHeaders,
  HttpParameterCodec,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  Configuration,
  InlineResponse200,
  PointOfInterest,
  PointOfInterestServiceInterface,
  PostPointOfInterest,
  PutPointOfInterest,
} from '../../api';
import { samplePois } from './sample-data';

@Injectable()
export class LocalPointOfInterestService
  implements PointOfInterestServiceInterface {
  public defaultHeaders!: HttpHeaders;
  public configuration!: Configuration;
  public encoder!: HttpParameterCodec;

  public pois = new Map<string, PointOfInterest>();
  private currentId = 2;

  constructor() {
    for (const p of samplePois) {
      this.pois.set(p.poIID, p);
      const id = Number.parseInt(p.poIID, 10);
      if (id >= this.currentId) {
        this.currentId = id + 1;
      }
    }
  }

  addPOI(
    poi: PostPointOfInterest,
    extraHttpRequestParams?: any
  ): Observable<PointOfInterest> {
    const newPoi = {
      poIID: `${this.currentId}`,
      ...poi,
      averageRating: 3,
      numberOfRatings: 10,
    } as PointOfInterest;
    this.pois.set(newPoi.poIID, newPoi);
    this.currentId++;
    return of(newPoi).pipe(delay(300));
  }

  deletePOI(poiID: string, extraHttpRequestParams?: any): Observable<{}> {
    if (this.pois.has(poiID)) {
      this.pois.delete(poiID);
      return of();
    } else {
      return throwError(
        new HttpErrorResponse({ status: 404, statusText: 'Not found' })
      );
    }
  }

  getPOI(
    poiID: string,
    extraHttpRequestParams?: any
  ): Observable<PointOfInterest> {
    if (this.pois.has(poiID)) {
      return of({ ...this.pois.get(poiID)! }).pipe(delay(300));
    } else {
      return throwError(
        new HttpErrorResponse({ status: 404, statusText: 'Not found' })
      );
    }
  }

  getPOIs(
    userName: string,
    extraHttpRequestParams?: any
  ): Observable<Array<PointOfInterest>> {
    return of(Array.from(this.pois.values()));
  }

  putPOI(
    poi: PutPointOfInterest,
    extraHttpRequestParams?: any
  ): Observable<{}> {
    if (poi.id && this.pois.has(poi.id)) {
      const updated = {
        ...poi,
        averageRating: 3,
        numberOfRatings: 10,
        poIID: poi.id,
      } as PointOfInterest;
      this.pois.set(poi.id, updated);
      return of(updated).pipe(delay(300));
    } else {
      return throwError(
        new HttpErrorResponse({ status: 404, statusText: 'Not found' })
      );
    }
  }

  getCenterOfPOIs(
    userName: string,
    extraHttpRequestParams?: any
  ): Observable<InlineResponse200> {
    return of({ latitude: 48.1, longitude: 11.5 });
  }
}
