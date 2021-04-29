import { Component, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('snav') sidenav?: SideNavComponent;

  constructor() {}

  ngOnInit() {}
}
