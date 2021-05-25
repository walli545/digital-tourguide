import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  Configuration,
  PointOfInterest,
  PointOfInterestService,
  PostRoute,
  Route,
  RouteServiceInterface,
} from '../../api';

@Injectable()
export class LocalRouteService implements RouteServiceInterface {
  defaultHeaders!: HttpHeaders;
  configuration!: Configuration;

  private routes = new Map<string, Route>();
  private currentId = 1;
  private polyline = 'sdxdHshreAcT}o@';
  private polyline1 = 'sdxdHshreAw^dJrIc{@';
  private pois: PointOfInterest[] = [
    {
      id: '0',
      averageRating: 0,
      numberOfRatings: 0,
      name: 'SendlingerTor',
      latitude: 48.13401718904898,
      longitude: 11.56761646270752,
      description:
        'Das Sendlinger Tor ist das südliche Stadttor der historischen Altstadt in München. ',
    },
    {
      id: '1',
      name: 'Marienplatz',
      latitude: 48.13739675056184,
      longitude: 11.575448513031006,
      description:
        'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone. ',
      averageRating: 0,
      numberOfRatings: 10,
    },
    {
      id: '2',
      name: 'Stachus',
      latitude: 48.139167,
      longitude: 11.565833,
      description:
        'Der Stachus, offiziell Karlsplatz, ist ein Platz im Zentrum Münchens. ',
      averageRating: 0,
      numberOfRatings: 10,
    },
  ];

  constructor(private poiService: PointOfInterestService) {
    this.addRoute({
      pointOfInterests: [this.pois[0].id, this.pois[1].id, this.pois[2].id],
      polyline: this.polyline1,
      name: 'Innenstadt München',
      description: 'Vom Marienplatz über den Stachus zum Sendlinger Tor',
      duration: 1,
      creatorName: 'Mr.X',
    });
    for (let i = 0; i < 4; i++) {
      this.addRoute({
        name: 'ROUTENAME',
        description:
          'DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION',
        pointOfInterests: [this.pois[0].id, this.pois[1].id],
        creatorName: 'Mr.X',
        duration: 2,
        polyline: this.polyline,
      });
    }
  }

  addRoute(route: PostRoute, extraHttpRequestParams?: any): Observable<Route> {
    const newRoute = {
      id: `${this.currentId}`,
      pointOfInterests: route.pointOfInterests.map((p) => {
        return { ...this.pois[parseInt(p, 3)] };
      }),
      name: route.name,
      description: route.description,
      polyline: route.polyline,
      duration: route.duration,
      creatorName: route.creatorName,
    } as Route;
    this.routes.set(newRoute.id, newRoute);
    this.currentId++;
    return of(newRoute).pipe(delay(1_000));
  }

  deleteRoute(routeID: string, extraHttpRequestParams?: any): Observable<{}> {
    if (this.routes.has(routeID)) {
      this.routes.delete(routeID);
      return of();
    } else {
      return throwError(
        new HttpErrorResponse({ status: 404, statusText: 'Not found' })
      );
    }
  }

  getRoute(routeID: string, extraHttpRequestParams?: any): Observable<Route> {
    if (this.routes.has(routeID)) {
      return of({ ...this.routes.get(routeID)! }).pipe(delay(1_000));
    } else {
      return throwError(
        new HttpErrorResponse({ status: 404, statusText: 'Not found' })
      );
    }
  }

  getRoutes(
    userName: string,
    extraHttpRequestParams?: any
  ): Observable<string[]> {
    return of(Array.from(this.routes.values()).map((p) => p.id)).pipe(
      delay(1_000)
    );
  }

  putRoute(route: PostRoute, extraHttpRequestParams?: any): Observable<{}> {
    if (route.id && this.routes.has(route.id)) {
      const updated = {
        id: route.id,
        pointOfInterests: route.pointOfInterests.map((p) => {
          // this.pois[parseInt(p,3)].id = p;
          return { ...this.pois[parseInt(p, 3)] };
        }),
        name: route.name,
        description: route.description,
        polyline: route.polyline,
        duration: route.duration,
        creatorName: route.creatorName,
      };
      this.routes.set(route.id, updated);
      return of(updated).pipe(delay(1_000));
    } else {
      return throwError(
        new HttpErrorResponse({ status: 404, statusText: 'Not found' })
      );
    }
  }
}
