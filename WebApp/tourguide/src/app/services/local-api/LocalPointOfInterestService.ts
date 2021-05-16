import {
  HttpErrorResponse,
  HttpHeaders,
  HttpParameterCodec,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  Configuration,
  PointOfInterest,
  PointOfInterestServiceInterface,
  PostPointOfInterest,
} from '../../api';

export class LocalPointOfInterestService
  implements PointOfInterestServiceInterface {
  public defaultHeaders!: HttpHeaders;
  public configuration!: Configuration;
  public encoder!: HttpParameterCodec;

  private pois = new Map<number, PointOfInterest>();
  private currentId = 0;

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
    this.pois.set(this.currentId, newPoi);
    this.currentId++;
    return of(newPoi).pipe(delay(5_000));
  }

  deletePOI(poiID: number, extraHttpRequestParams?: any): Observable<{}> {
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
    poiID: number,
    extraHttpRequestParams?: any
  ): Observable<PointOfInterest> {
    if (this.pois.has(poiID)) {
      return of(this.pois.get(poiID)!);
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
      return throwError(
        new HttpErrorResponse({ status: 404, statusText: 'Not found' })
      );
    }
  }
}
