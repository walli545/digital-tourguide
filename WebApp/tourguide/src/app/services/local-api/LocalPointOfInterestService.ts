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
} from '../../api';

@Injectable()
export class LocalPointOfInterestService
  implements PointOfInterestServiceInterface {
  public defaultHeaders!: HttpHeaders;
  public configuration!: Configuration;
  public encoder!: HttpParameterCodec;

  private pois = new Map<string, PointOfInterest>();
  private currentId = 2;

  constructor() {
    this.addPOI({
      id: '0',
      name: 'SendlingerTor',
      latitude: 48.13401718904898,
      longitude: 11.56761646270752,
      description:
        'Das Sendlinger Tor ist das südliche Stadttor der historischen Altstadt in München. ',
    });
    this.addPOI({
      id: '1',
      name: 'Marienplatz',
      latitude: 48.13739675056184,
      longitude: 11.575448513031006,
      description:
        'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone. ',
    });
    this.addPOI({
      id: '2',
      name: 'Stachus',
      latitude: 48.139167,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
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
      return of({ ...this.pois.get(poiID)! }).pipe(delay(2_000));
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
    return of(Array.from(this.pois.values()).map((p) => p.id)).pipe(delay(500));
  }

  putPOI(
    poi: PostPointOfInterest,
    extraHttpRequestParams?: any
  ): Observable<PointOfInterest> {
    if (poi.id && this.pois.has(poi.id)) {
      const updated = {
        id: `${poi.id}`,
        ...poi,
        averageRating: 3,
        numberOfRatings: 10,
      };
      this.pois.set(poi.id, updated);
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
