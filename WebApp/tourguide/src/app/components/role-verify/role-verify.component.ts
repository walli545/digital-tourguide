import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleModel, VerificationService } from 'src/app/api';

@Component({
  selector: 'app-role-verify',
  templateUrl: './role-verify.component.html',
  styleUrls: ['./role-verify.component.scss'],
})
export class RoleVerifyComponent implements OnInit {
  requests = new Map<string, RoleModel>();
  loading = true;
  constructor(
    private verificationService: VerificationService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadRequests();
  }

  async loadRequests(): Promise<void> {
    this.loading = true;
    try {
      const requests = await this.verificationService.getRequests().toPromise();
      for (const r of requests) {
        this.requests.set(r.creatorName, r);
      }
    } finally {
      this.loading = false;
    }
  }

  async onAccept(role: RoleModel): Promise<void> {
    this.loading = true;
    try {
      await this.verificationService
        .acceptRequest(role.creatorName)
        .toPromise();
      this.requests.delete(role.creatorName);
    } catch (e) {
      this.snackBar.open('failed to accept role request', undefined, {
        duration: 3000,
      });
    }
    this.loading = false;
  }
  async onDeny(role: RoleModel): Promise<void> {
    this.loading = true;
    try {
      await this.verificationService.denyRequest(role.creatorName).toPromise();
      this.requests.delete(role.creatorName);
    } catch (e) {
      this.snackBar.open('failed to deny role request', undefined, {
        duration: 3000,
      });
    }
    this.loading = false;
  }
  toArray(): RoleModel[] {
    return Array.from(this.requests.values());
  }
}
