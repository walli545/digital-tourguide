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
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '1',
      name: 'Marienplatz',
      latitude: 48.13739675056184,
      longitude: 11.575448513031006,
      description:
        'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '2',
      name: 'Stachus',
      latitude: 48.1392,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '3',
      name: 'A',
      latitude: 48.14,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '4',
      name: 'B',
      latitude: 48.15,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '5',
      name: 'C',
      latitude: 48.16,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '6',
      name: 'D',
      latitude: 48.17,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '7',
      name: 'E',
      latitude: 48.18,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '8',
      name: 'F',
      latitude: 48.19,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '9',
      name: 'G',
      latitude: 48.2,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '10',
      name: 'H',
      latitude: 48.21,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '11',
      name: 'I',
      latitude: 48.22,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
    });
    this.addPOI({
      id: '12',
      name: 'J',
      latitude: 48.23,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      imageURL:
        'https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg',
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
  ): Observable<Array<string>> {
    return of(Array.from(this.pois.values()).map((p) => p.id)).pipe(delay(300));
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
