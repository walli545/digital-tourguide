import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

export const ADMIN = 'admin';
export const MODERATOR = 'moderator';
export const CONTENT_CREATOR = 'content-creator';
export const PROMOTER = 'promoter';
export const USER = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly allRoles = [
    ADMIN,
    MODERATOR,
    CONTENT_CREATOR,
    PROMOTER,
    USER,
  ];

  constructor(private keycloak: KeycloakService) {}

  async getRole(): Promise<string> {
    await this.checkLoggedIn();
    const roles = this.keycloak.getUserRoles();

    for (const role of this.allRoles) {
      if (roles.includes(role)) {
        return role;
      }
    }
    throw new Error('no role found');
  }

  async getUsername(): Promise<string> {
    await this.checkLoggedIn();
    await this.keycloak.loadUserProfile();
    return this.keycloak.getUsername();
  }

  async logout(redirectUri?: string): Promise<void> {
    await this.keycloak.logout(redirectUri);
  }

  isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  private async checkLoggedIn(): Promise<void> {
    if (!(await this.keycloak.isLoggedIn())) {
      throw new Error('Not logged in');
    }
  }
}
