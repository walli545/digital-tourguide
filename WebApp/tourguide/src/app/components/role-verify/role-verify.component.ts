import { Component, OnInit } from '@angular/core';
import { RoleModel, VerificationService } from 'src/app/api';

@Component({
  selector: 'app-role-verify',
  templateUrl: './role-verify.component.html',
  styleUrls: ['./role-verify.component.scss'],
})
export class RoleVerifyComponent implements OnInit {
  requests: RoleModel[] = [];
  loading = true;
  constructor(private verificationService: VerificationService) {}

  async ngOnInit(): Promise<void> {
    try {
      const requests = await this.verificationService.getRequests().toPromise();
      this.requests = requests;
    } finally {
      this.loading = false;
    }
  }

  onAccept(role: RoleModel): void {
    this.verificationService.acceptRequest(role.creatorName);
  }
  onDeny(role: RoleModel): void {
    this.verificationService.denyRequest(role.creatorName);
  }
}
