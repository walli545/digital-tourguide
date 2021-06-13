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
import { OneOfRequiredRolePipe } from '../../pipes/one-of-required-role.pipe';
import { AuthService } from '../../services/auth.service';
import { DropdownAccountComponent } from '../dropdown-account/dropdown-account.component';
import { SideNavComponent } from './side-nav.component';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', [
      'getRole',
      'getUsername',
    ]);
    authServiceMock.getRole.and.returnValue(Promise.resolve('content-creator'));
    authServiceMock.getUsername.and.returnValue(Promise.resolve('ABC'));
    await TestBed.configureTestingModule({
      declarations: [
        SideNavComponent,
        OneOfRequiredRolePipe,
        DropdownAccountComponent,
      ],
      imports: [
        MatSidenavModule,
        NoopAnimationsModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
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
