import {
  HttpErrorResponse,
  HttpHeaders,
  HttpParameterCodec,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  Configuration,
  InlineResponse200,
  PointOfInterest,
  PointOfInterestServiceInterface,
  PostPointOfInterest,
} from '../../api';

export class LocalPointOfInterestService
  implements PointOfInterestServiceInterface {
  public defaultHeaders!: HttpHeaders;
  public configuration!: Configuration;
  public encoder!: HttpParameterCodec;

  private pois = new Map<string, PointOfInterest>();
  private currentId = 2;

  constructor() {
    this.pois.set('1', {
      latitude: 48.1373,
      longitude: 11.57549,
      id: '1',
      description: 'Hauptplatz in München\n\nabc',
      name: 'Marienplatz',
      numberOfRatings: 10,
      averageRating: 1,
    });
  }

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
    this.pois.set(newPoi.id, newPoi);
    this.currentId++;
    return of(newPoi).pipe(delay(5_000));
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
      return of(this.pois.get(poiID)!).pipe(delay(2_000));
    } else {
      return throwError(
        new HttpErrorResponse({ status: 404, statusText: 'Not found' })
      );
    }
  }

  getPOIs(
    userName: string,
    extraHttpRequestParams?: any
  ): Observable<Array<string>> {
    return of(Array.from(this.pois.values()).map((p) => p.id)).pipe(
      delay(2_000)
    );
  }

  putPOI(
    poiID: string,
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
      return of(updated).pipe(delay(2_000));
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
