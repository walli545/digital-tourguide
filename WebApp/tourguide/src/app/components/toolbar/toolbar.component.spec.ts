import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  let routerStub: any;

  beforeEach(async () => {
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [MatButtonModule, MatToolbarModule, MatIconModule],
      providers: [{ provide: Router, useValue: routerStub }],
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
