import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('snav') sidenav?: SideNavComponent;

  isLoggedIn = false;

  constructor(public authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.authService.isLoggedIn();
  }
}
