import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
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
  setRole = '';
  roles = [this.admin, this.contentCreator, this.promoter];
  selectDisabled = false;
  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.currentRole = await this.authService.getRole();
  }

  onRequest(): void {
    console.log('request: ' + this.setRole);
    this.selectDisabled = true;
  }

  onGiveBack(): void {
    console.log('giveBack');
  }
  selectedValue(event: MatSelectChange): void {
    this.setRole = event.value;
  }
}
