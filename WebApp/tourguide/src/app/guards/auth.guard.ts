import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<UrlTree | boolean> {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    if (this.checkRolesAny(route)) {
      return true;
    } else {
      return this.router.parseUrl('/not-authorized');
    }
  }

  // private checkRolesEvery(route: ActivatedRouteSnapshot): boolean {
  //   const requiredRoles = route.data.everyRole;

  //   if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
  //     return true;
  //   }

  //   return requiredRoles.every((role) => this.roles.includes(role));
  // }

  private checkRolesAny(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.firstChild?.data.anyRole;

    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.some((role) => this.roles.includes(role));
  }
}
