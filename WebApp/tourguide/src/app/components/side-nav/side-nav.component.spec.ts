import { Location } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNavComponent } from './side-nav.component';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavComponent],
      imports: [
        MatSidenavModule,
        NoopAnimationsModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('toggling open nav should close it', () => {
    component.sidenav?.open();

    expect(component.sidenav?.opened).toBeTrue();
    component.toggle();

    expect(component.sidenav?.opened).toBeFalse();
  });

  it('toggling closed nav should open it', () => {
    component.sidenav?.close();

    expect(component.sidenav?.opened).toBeFalse();
    component.toggle();

    expect(component.sidenav?.opened).toBeTrue();
  });

  it('clicking first entry should navigate to home', fakeAsync(() => {
    fixture.debugElement
      .query(By.css('mat-nav-list:first-child'))
      .nativeElement.click();
    tick();

    expect(TestBed.inject(Location).path()).toBe('');
  }));
});
