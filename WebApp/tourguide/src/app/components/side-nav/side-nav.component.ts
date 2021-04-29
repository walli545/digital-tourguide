import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @ViewChild('snav') sidenav?: MatSidenav;

  constructor(private router: Router) {}

  ngOnInit() {}

  public toggle(): void {
    this.sidenav?.toggle();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
