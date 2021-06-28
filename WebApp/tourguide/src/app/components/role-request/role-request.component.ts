import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private verificationService: VerificationService,
    private snackbar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentRole = await this.authService.getRole();
    this.userName = await this.authService.getUsername();
    this.roles = this.authService.allRoles.filter(
      (r) => r !== this.currentRole
    );
  }

  async onRequest(): Promise<void> {
    this.selectDisabled = true;
    try {
      await this.verificationService
        .requestRole({
          creatorName: this.userName,
          requestedRole: this.setRole,
        })
        .toPromise();
    } catch (e) {
      this.snackbar.open('failed to request role', undefined, {
        duration: 3000,
      });
      this.selectDisabled = false;
    }
  }

  selectedValue(event: MatSelectChange): void {
    this.setRole = event.value;
  }
}
