import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  Configuration,
  PointOfInterest,
  PointOfInterestService,
  PostRoute,
  PutRoute,
  Route,
  RouteServiceInterface,
} from '../../api';
import { LocalPointOfInterestService } from './LocalPointOfInterestService';

@Injectable()
export class LocalRouteService implements RouteServiceInterface {
  defaultHeaders!: HttpHeaders;
  configuration!: Configuration;

  private routes = new Map<string, Route>();
  private currentId = 1;
  private polyline = 'sdxdHshreAcT}o@';
  private polyline1 = 'sdxdHshreAw^dJrIc{@';

  constructor(private poiService: PointOfInterestService) {
    const pois = this.getPois();
    this.addRoute({
      pointOfInterests: [pois[0].poIID, pois[1].poIID, pois[2].poIID],
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
        pointOfInterests: [pois[0].poIID, pois[1].poIID],
        creatorName: 'Mr.X',
        duration: 2,
        polyline: this.polyline,
      });
    }
  }

  addRoute(route: PostRoute, extraHttpRequestParams?: any): Observable<Route> {
    const newRoute = {
      routeID: `${this.currentId}`,
      pointOfInterests: route.pointOfInterests.map((p) => {
        return { ...this.getPois()[parseInt(p, 10)] };
      }),
      name: route.name,
      description: route.description,
      polyline: route.polyline,
      duration: route.duration,
      creatorName: route.creatorName,
    } as Route;
    this.routes.set(newRoute.routeID, newRoute);
    this.currentId++;
    return of(newRoute).pipe(delay(300));
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
      return of({ ...this.routes.get(routeID)! }).pipe(delay(300));
    } else {
      return throwError(
        new HttpErrorResponse({ status: 404, statusText: 'Not found' })
      );
    }
  }

  getRoutes(
    userName: string,
    extraHttpRequestParams?: any
  ): Observable<Route[]> {
    return of(Array.from(this.routes.values())).pipe(delay(300));
  }

  putRoute(route: PutRoute, extraHttpRequestParams?: any): Observable<{}> {
    if (route.id && this.routes.has(route.id)) {
      const updated = {
        routeID: route.id,
        pointOfInterests: route.pointOfInterests.map((p) => {
          return { ...this.getPois()[parseInt(p, 10)] };
        }),
        name: route.name,
        description: route.description,
        polyline: route.polyline,
        duration: route.duration,
        creatorName: route.creatorName,
      } as Route;
      this.routes.set(route.id, updated);
      return of(updated).pipe(delay(1_000));
    } else {
      return throwError(
        new HttpErrorResponse({ status: 404, statusText: 'Not found' })
      );
    }
  }

  private getPois(): PointOfInterest[] {
    return Array.from(
      ((this.poiService as any) as LocalPointOfInterestService).pois.values()
    );
  }
}
