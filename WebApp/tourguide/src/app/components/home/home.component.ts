import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username = '';

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.username = await this.authService.getUsername();
  }
}
