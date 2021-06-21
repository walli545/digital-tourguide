import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ADMIN, CONTENT_CREATOR, PROMOTER } from '../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @ViewChild('snav') sidenav!: MatSidenav;

  contentCreator = CONTENT_CREATOR;
  promoter = PROMOTER;
  admin = ADMIN;

  public toggle(): void {
    this.sidenav.toggle();
  }
}
