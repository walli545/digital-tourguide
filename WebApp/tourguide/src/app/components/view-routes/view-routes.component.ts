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
  polyline = 'sdxdHshreAcT}o@';
  mapUrl =
    'https://maps.googleapis.com/maps/api/staticmap?&size=600x300&maptype=roadmap';

  apikey = 'AIzaSyAiZcSKHkU0fDADhteoQJJzkdXQfvnCHnQ';
  i = 0;

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
    /*     //temp test
    this.initArray();
    setTimeout(() => {
      this.loading = false;
    }, 10000);
  }

  //temp test function
  initArray(): void {
    setTimeout(() => {
      this.routes.set(this.i.toString(), {
        name: 'ROUTENAME',
        id: this.i.toString(),
        description:
          'DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION',
        pointOfInterests: [],
        creatorName: 'Mr.X',
        duration: 2,
        polyline: this.polyline,
      });
      this.i++; //  increment the counter
      if (this.i < 10) {
        //  if the counter < 10, call the loop function
        this.initArray(); //  ..  again which will trigger another
      } //  ..  setTimeout()
    }, 1000); */
  }

  toArray(): Route[] {
    return Array.from(this.routes.values());
  }

  hasRoutes(): boolean {
    return this.routes.size > 0;
  }

  buildStaticMapUrl(route: Route): string {
    const url =
      this.mapUrl + '&path=enc:' + route.polyline + '&key=' + this.apikey;
    console.log(url);
    return url;
  }

  onNew(): void {
    console.log('new');
    this.router.navigate(['route', 'new']);
  }

  onEdit(route: Route): void {
    console.log('edit ' + route);
    this.router.navigate(['route', route.id]);
  }

  onDelete(route: Route): void {
    console.log('delete ' + route);
    this.routeService.deleteRoute(route.id);
    this.routes.delete(route.id);
  }
}
