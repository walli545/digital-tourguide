import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() hamburgerClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  onHamburgerClick(): void {
    this.hamburgerClick.emit();
  }

  onTitleClick(): void {
    this.router.navigate(['']);
  }
}
