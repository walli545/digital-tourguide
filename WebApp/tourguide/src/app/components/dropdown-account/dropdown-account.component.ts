import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dropdown-account',
  templateUrl: './dropdown-account.component.html',
  styleUrls: ['./dropdown-account.component.scss'],
})
export class DropdownAccountComponent implements OnInit {
  role = '';
  userName = '';

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.role = await this.authService.getRole();
    this.userName = await this.authService.getUsername();
  }

  onLogoutClick(): void {
    this.authService.logout('');
  }
}
