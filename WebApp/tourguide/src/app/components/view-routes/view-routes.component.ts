import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  async ngOnInit(): Promise<void> {
    const routes = await this.routeService.getRoutes(this.username).toPromise();
    for (const r of routes) {
      this.routes.set(r.routeID, r);
    }
    this.loading = false;
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
    this.router.navigate(['route', route.routeID]);
  }

  onDelete(route: Route): void {
    this.routeService.deleteRoute(route.routeID);
    this.routes.delete(route.routeID);
  }
}
