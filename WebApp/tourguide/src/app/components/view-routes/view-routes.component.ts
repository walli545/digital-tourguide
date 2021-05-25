import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { Route, RouteService } from 'src/app/api';
import { UrlGeneratorService } from 'src/app/services/url-generator.service';

@Component({
  selector: 'app-view-routes',
  templateUrl: './view-routes.component.html',
  styleUrls: ['./view-routes.component.scss'],
})
export class ViewRoutesComponent implements OnInit {
  loading = true;
  routes = new Map<string, Route>();
  username = '';

  constructor(
    private routeService: RouteService,
    private router: Router,
    private urlGen: UrlGeneratorService
  ) {}

  ngOnInit(): void {
    this.routeService
      .getRoutes(this.username)
      .pipe(
        map((routes) => {
          if (routes.length === 0) {
            this.loading = false;
          }
          console.log(routes.length);
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
    return this.urlGen.buildStaticMapUrl(route);
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
