import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DisplayRolePipe } from '../../pipes/display-role.pipe';
import { AuthService } from '../../services/auth.service';
import { DropdownAccountComponent } from '../dropdown-account/dropdown-account.component';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  let routerStub: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceStub = jasmine.createSpyObj('AuthService', [
      'getRole',
      'getUsername',
    ]);
    authServiceStub.getRole.and.returnValue(Promise.resolve('content-creator'));
    authServiceStub.getUsername.and.returnValue(Promise.resolve('ABC'));
    routerStub = jasmine.createSpyObj<Router>('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        DropdownAccountComponent,
        DisplayRolePipe,
      ],
      imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: authServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('navigates to home when on title click', () => {
    fixture.debugElement.query(By.css('.app-name')).nativeElement.click();

    expect(routerStub.navigate).toHaveBeenCalledWith(['']);
  });

  it('emits hamburgerClick event on hamburger icon click', (done) => {
    component.hamburgerClick.subscribe(() => {
      expect(true).toBeTruthy();
      done();
    });
    fixture.debugElement.query(By.css('button')).nativeElement.click();
  });
});
