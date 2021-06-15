import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Role, VerificationService } from 'src/app/api';
import { AuthService } from 'src/app/services/auth.service';
import { ADMIN, CONTENT_CREATOR, PROMOTER } from '../../services/auth.service';

@Component({
  selector: 'app-role-request',
  templateUrl: './role-request.component.html',
  styleUrls: ['./role-request.component.scss'],
})
export class RoleRequestComponent implements OnInit {
  roleControl = new FormControl('', Validators.required);
  contentCreator = CONTENT_CREATOR;
  promoter = PROMOTER;
  admin = ADMIN;
  currentRole = '';
  setRole!: Role;
  roles = [this.admin, this.contentCreator, this.promoter];
  selectDisabled = false;
  userName = '';
  constructor(
    private authService: AuthService,
    private verificationService: VerificationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentRole = await this.authService.getRole();
    this.userName = await this.authService.getUsername();
    this.roles = this.roles.filter(
      (r) => r !== this.currentRole && r !== this.contentCreator
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

  onGiveBack(): void {
    console.log('giveBack');
  }

  selectedValue(event: MatSelectChange): void {
    this.setRole = event.value;
  }
}
