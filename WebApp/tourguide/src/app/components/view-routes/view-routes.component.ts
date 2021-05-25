import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { Route, RouteService } from 'src/app/api';

@Component({
  selector: 'app-view-routes',
  templateUrl: './view-routes.component.html',
  styleUrls: ['./view-routes.component.scss'],
})
export class ViewRoutesComponent implements OnInit {
  loading = true;
  routes = new Map<string, Route>();
  username = '';
  mapUrl =
    'https://maps.googleapis.com/maps/api/staticmap?&size=600x300&maptype=roadmap';
  mapStyle =
    // eslint-disable-next-line max-len
    '&style=feature:poi|all|visibility:off&style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c';

  mapUrl1 = 'https://maps.googleapis.com/maps/api/staticmap?&size=600x300';

  apikey = 'AIzaSyAiZcSKHkU0fDADhteoQJJzkdXQfvnCHnQ';

  constructor(private routeService: RouteService, private router: Router) {}

  ngOnInit(): void {
    this.routeService
      .getRoutes(this.username)
      .pipe(
        map((routes) => {
          routes.map((id) => {
            this.routeService
              .getRoute(id)
              .pipe(
                map((r) => {
                  this.routes.set(id, r);
                }),
                finalize(() => (this.loading = false))
              )
              .subscribe();
          });
        })
      )
      .subscribe();
  }

  toArray(): Route[] {
    return Array.from(this.routes.values());
  }

  hasRoutes(): boolean {
    return this.routes.size > 0;
  }

  buildStaticMapUrl(route: Route): string {
    // eslint-disable-next-line no-useless-escape
    const reComma = /\,/gi;
    // eslint-disable-next-line no-useless-escape
    const reSemi = /\;/gi;
    const marker =
      route.pointOfInterests
        .map((p) => '|' + p.latitude + ';' + p.longitude)
        .toString()
        .replace(reComma, '')
        .replace(reSemi, ',') + '|';
    console.log(marker);
    const url =
      this.mapUrl +
      '&path=color:0xffc107|enc:' +
      route.polyline +
      '&markers=color:0x9c27b0' +
      marker +
      this.mapStyle +
      '&key=' +
      this.apikey;

    return url;
  }

  onNew(): void {
    this.router.navigate(['route', 'new']);
  }

  onEdit(route: Route): void {
    this.router.navigate(['route', route.id]);
  }

  onDelete(route: Route): void {
    this.routeService.deleteRoute(route.id);
    this.routes.delete(route.id);
  }
}
