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
  private poi: PointOfInterest = {
    id: '1',
    averageRating: 0,
    numberOfRatings: 0,
    name: 'SendlingerTor',
    latitude: 48.13401718904898,
    longitude: 11.56761646270752,
    description:
      'Das Sendlinger Tor ist das südliche Stadttor der historischen Altstadt in München. ',
  };

  constructor(private poiService: PointOfInterestService) {}

  addRoute(route: PostRoute, extraHttpRequestParams?: any): Observable<Route> {
    const newRoute = {
      id: `${this.currentId}`,
      pointOfInterests: route.pointOfInterests.map((p) => {
        this.poi.id = p;
        return { ...this.poi };
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
          this.poi.id = p;
          return { ...this.poi };
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
