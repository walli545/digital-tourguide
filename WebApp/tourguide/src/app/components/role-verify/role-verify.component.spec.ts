import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleVerifyComponent } from './role-verify.component';

describe('RoleVerifyComponent', () => {
  let component: RoleVerifyComponent;
  let fixture: ComponentFixture<RoleVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
