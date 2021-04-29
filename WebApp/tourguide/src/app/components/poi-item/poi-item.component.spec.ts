import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiItemComponent } from './poi-item.component';

describe('PoiItemComponent', () => {
  let component: PoiItemComponent;
  let fixture: ComponentFixture<PoiItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoiItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
