import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route, RouteService } from 'src/app/api';
import { UrlGeneratorService } from 'src/app/services/url-generator.service';
import { AuthService } from '../../services/auth.service';
import { sortRoutes } from '../../utils/sort';

@Component({
  selector: 'app-view-routes',
  templateUrl: './view-routes.component.html',
  styleUrls: ['./view-routes.component.scss'],
})
export class ViewRoutesComponent implements OnInit {
  loading = true;
  routes = new Map<string, Route>();

  constructor(
    private routeService: RouteService,
    private router: Router,
    private urlGen: UrlGeneratorService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const routes = (
        await this.routeService
          .getRoutes(await this.authService.getUsername())
          .toPromise()
      ).sort(sortRoutes);
      for (const r of routes) {
        this.routes.set(r.routeId, r);
      }
    } finally {
      this.loading = false;
    }
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
    this.router.navigate(['route', route.routeId]);
  }

  onDelete(route: Route): void {
    this.routeService
      .deleteRoute(route.routeId)
      .subscribe({ next: () => this.routes.delete(route.routeId) });
  }
}
