import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DropdownAccountComponent } from './components/dropdown-account/dropdown-account.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DisplayRolePipe } from './pipes/display-role.pipe';
import { OneOfRequiredRolePipe } from './pipes/one-of-required-role.pipe';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', [
      'getRole',
      'getUsername',
    ]);
    authServiceMock.getRole.and.returnValue(Promise.resolve('content-creator'));
    authServiceMock.getUsername.and.returnValue(Promise.resolve('ABC'));
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SideNavComponent,
        ToolbarComponent,
        DropdownAccountComponent,
        OneOfRequiredRolePipe,
        DisplayRolePipe,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
