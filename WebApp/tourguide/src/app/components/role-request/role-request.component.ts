import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Role, VerificationService } from 'src/app/api';
import { AuthService, USER } from 'src/app/services/auth.service';

@Component({
  selector: 'app-role-request',
  templateUrl: './role-request.component.html',
  styleUrls: ['./role-request.component.scss'],
})
export class RoleRequestComponent implements OnInit {
  roleControl = new FormControl('', Validators.required);
  user = USER;
  currentRole = '';
  setRole!: Role;
  roles!: string[];
  selectDisabled = false;
  userName = '';
  constructor(
    private authService: AuthService,
    private verificationService: VerificationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentRole = await this.authService.getRole();
    this.userName = await this.authService.getUsername();
    this.roles = this.authService.allRoles.filter(
      (r) => r !== this.currentRole
    );
  }

  onRequest(): void {
    this.selectDisabled = true;
    const res = this.verificationService.requestRole({
      creatorName: this.userName,
      requestedRole: this.setRole,
    });
    console.log(
      'request: ' + this.userName + ' ' + this.setRole + ' ' + res.subscribe()
    );
  }

  selectedValue(event: MatSelectChange): void {
    this.setRole = event.value;
  }
}
